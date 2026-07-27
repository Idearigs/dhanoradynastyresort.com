<?php
/**
 * Seed the database with the real resort content and create the first admin.
 *
 * CLI ONLY (blocked from the web by .htaccess). On cPanel use "Terminal", or run
 * locally against the same DB:
 *
 *   php seed.php --admin-email=you@example.com --admin-password='S3cret!' [--force]
 *
 * Data source of truth:
 *   - Menu:    src/lib/menu.ts  (names/descriptions)  +  content/04-menu/menu.md (prices)
 *   - Rooms:   src/routes/rooms.tsx
 *   - Gallery: src/routes/gallery.tsx
 *
 * Re-running is a no-op for content unless --force is given (which wipes the
 * menu/rooms/gallery tables first, then re-seeds). Admins are never wiped; an
 * admin is created only if the email does not already exist.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("seed.php can only be run from the command line.\n");
}

require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/request.php';

// --- Parse CLI flags ---------------------------------------------------------
$opts  = getopt('', ['admin-email:', 'admin-password:', 'force']);
$force = isset($opts['force']);

$pdo = db();

// --- Admin -------------------------------------------------------------------
if (!empty($opts['admin-email']) && !empty($opts['admin-password'])) {
    $email = strtolower(trim((string) $opts['admin-email']));
    $exists = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $exists->execute([$email]);
    if ($exists->fetchColumn()) {
        echo "Admin '$email' already exists — skipping.\n";
    } else {
        $ins = $pdo->prepare('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)');
        $ins->execute([$email, auth_hash_password((string) $opts['admin-password']), 'admin']);
        echo "Created admin '$email'.\n";
    }
} else {
    echo "No --admin-email/--admin-password given — skipping admin creation.\n";
}

// --- Guard against clobbering existing content -------------------------------
$hasContent = (int) $pdo->query('SELECT COUNT(*) FROM menu_items')->fetchColumn() > 0
    || (int) $pdo->query('SELECT COUNT(*) FROM rooms')->fetchColumn() > 0
    || (int) $pdo->query('SELECT COUNT(*) FROM gallery_images')->fetchColumn() > 0;

if ($hasContent && !$force) {
    echo "Content already present — pass --force to wipe and re-seed content.\n";
    exit(0);
}

// Wipe BEFORE opening the transaction: `ALTER TABLE ... AUTO_INCREMENT` is DDL
// and causes an implicit commit in MySQL, which would end a transaction early
// and make the final commit() fail.
if ($force) {
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
    foreach (['room_images', 'menu_items', 'gallery_images', 'menu_categories', 'rooms'] as $t) {
        $pdo->exec("DELETE FROM $t");
        $pdo->exec("ALTER TABLE $t AUTO_INCREMENT = 1");
    }
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 1');
    echo "Wiped existing content.\n";
}

$pdo->beginTransaction();

// --- Menu --------------------------------------------------------------------
// [category name, image src, image alt, [ [group|null, name, description|null, price|null], ... ]]
$menu = menu_seed_data();

$catStmt = $pdo->prepare(
    'INSERT INTO menu_categories (name, slug, image_src, image_alt, sort_order, is_published)
     VALUES (?, ?, ?, ?, ?, 1)'
);
$itemStmt = $pdo->prepare(
    'INSERT INTO menu_items (category_id, group_name, name, slug, description, price, image_src, image_alt, is_available, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)'
);

// Dishes that ship with their own photo at public/images/dishes/<slug>.webp
// (mirrors DISH_IMAGES in src/lib/menu.ts). Others fall back to the category banner.
$dishImages = dish_image_slugs();

$catOrder = 0;
$itemCount = 0;
foreach ($menu as $cat) {
    [$name, $imgSrc, $imgAlt, $items] = $cat;
    $catStmt->execute([$name, make_slug($name), $imgSrc, $imgAlt, $catOrder++]);
    $categoryId = (int) $pdo->lastInsertId();
    $order = 0;
    foreach ($items as [$group, $itemName, $desc, $price]) {
        $slug = make_slug($itemName);
        $dishSrc = in_array($slug, $dishImages, true) ? "/images/dishes/$slug.webp" : null;
        $dishAlt = $dishSrc !== null ? $itemName : null;
        $itemStmt->execute([$categoryId, $group, $itemName, $slug, $desc, $price, $dishSrc, $dishAlt, $order++]);
        $itemCount++;
    }
}
echo "Seeded " . count($menu) . " menu categories, $itemCount items.\n";

// --- Rooms -------------------------------------------------------------------
$rooms = rooms_seed_data();
$roomStmt = $pdo->prepare(
    'INSERT INTO rooms (room_no, slug, tag, name, description, beds, view_name, price_lkr, sort_order, is_published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
);
$roomImgStmt = $pdo->prepare(
    'INSERT INTO room_images (room_id, src, alt, is_cover, sort_order) VALUES (?, ?, ?, ?, ?)'
);

$roomOrder = 0;
foreach ($rooms as $r) {
    $roomStmt->execute([
        $r['no'], make_slug($r['name']) . '-' . $r['no'], $r['tag'], $r['name'],
        $r['desc'], $r['beds'], $r['view'], $r['price'], $roomOrder++,
    ]);
    $roomId = (int) $pdo->lastInsertId();
    for ($n = 1; $n <= $r['shots']; $n++) {
        $roomImgStmt->execute([
            $roomId,
            "/images/rooms/{$r['no']}-{$n}.webp",
            "{$r['name']}, photo {$n} of {$r['shots']}",
            $n === 1 ? 1 : 0,
            $n - 1,
        ]);
    }
}
echo "Seeded " . count($rooms) . " rooms with photos.\n";

// --- Gallery -----------------------------------------------------------------
$gallery = gallery_seed_data();
$galStmt = $pdo->prepare(
    'INSERT INTO gallery_images (category, caption, src, alt, sort_order, is_published)
     VALUES (?, ?, ?, ?, ?, 1)'
);
$galOrder = 0;
foreach ($gallery as $g) {
    $galStmt->execute([$g['cat'], $g['caption'], $g['src'], $g['caption'], $galOrder++]);
}
echo "Seeded " . count($gallery) . " gallery images.\n";

$pdo->commit();
echo "Done.\n";


// =============================================================================
// Seed data (transcribed from the repo — see header for sources).
// =============================================================================

function menu_seed_data(): array
{
    return [
        ['Breakfast', '/images/menu/breakfast.webp',
            'A Sri Lankan breakfast plate of rice with tempered vegetables and green chilli', [
            ['Continental', 'Herbal Porridge', null, null],
            ['Continental', 'Fruit Juice', null, null],
            ['Continental', 'Fruit Plate', null, null],
            ['Continental', 'Curd with Honey', null, null],
            ['Continental', 'Pancake', null, null],
            ['Continental', 'Toast with Butter & Jam', null, null],
            ['Sri Lankan', 'Pol Roti', 'Chicken curry, dhal curry and katta sambol.', null],
            ['Sri Lankan', 'Milk Rice', 'Chicken curry, dhal curry and katta sambol.', null],
            ['Sri Lankan', 'String Hoppers', 'Chicken or fish curry, dhal or potato curry and coconut sambol.', null],
            ['Sri Lankan', 'Sri Lankan Rice & Curry', 'Chicken or fish curry, dhal curry, coconut sambol and papadam.', null],
            ['English', 'A Full English', 'Sausage, bacon, sautéed potato and your choice of fried, scrambled, poached or boiled egg, or a Sri Lankan omelette.', null],
            ['English', 'Waffles', 'Caramelised banana and kithul treacle.', null],
            ['English', 'Super Green Omelette', 'Spinach, basil and parsley.', null],
            ['English', 'Avocado Toast', 'Mashed avocado on toast, served with a poached egg.', null],
        ]],
        ['Rice & Curry', '/images/menu/rice-curry.webp',
            'Sri Lankan rice and curry served in clay pots with dhal, green beans and sambol', [
            [null, 'White Basmati Rice', 'Seer fish devilled or black pork curry, dhal curry, green beans tempered, coconut sambol, fried chilli and papadam.', 2800],
            [null, 'Yellow Rice', 'Chicken or fish curry, potato tempered, green bean curry, cutlet and papadam.', 2800],
            [null, 'White Rice', 'Mushroom tempered, dhal curry, brinjal moju, coconut sambol, fried chilli and papadam.', 2800],
            [null, 'Yellow Rice & Beetroot', 'Beetroot curry, kola sambol, dhal tempered, fried chicken or egg omelette, cutlet and papadam.', 2100],
            [null, 'Pumpkin Soup Platter', 'Pumpkin soup, vegetable fried rice, vegetable chopsuey and fried chicken with devilled chilli paste.', 2800],
            [null, 'Thosai', 'Sambar and green chutney.', 1500],
            [null, 'String Hoppers', 'Dhal curry, chicken curry and coconut sambol.', 2000],
            [null, 'Rice & Curry with Four Vegetables', null, 1500],
        ]],
        ['Main Course', '/images/menu/main-course.webp',
            'Grilled chicken on a wooden board with lemon, rosemary and butter vegetables', [
            [null, 'Grilled Chicken', 'Served with BBQ sauce, garlic rice and butter vegetables.', 3500],
            [null, 'Grilled Fish', 'Served with lemon butter sauce, french fries and butter vegetables.', 3500],
            [null, 'The B.B.Q.', 'Chicken, pork, fish, prawns and jumbo sausage with BBQ sauce, mixed vegetable salad, french fries and garlic rice.', 6000],
            [null, 'Crumbed Fried Chicken', 'Served with chilli sauce, mashed potato and butter vegetables.', 3300],
            [null, 'Crumbed Fried Fish', 'Served with tartar sauce, mashed potato and butter vegetables.', 3300],
            [null, 'Black Pork Curry with Coconut Roti', 'Sri Lankan style black pork curry served with coconut roti and coconut sambol.', 3000],
            [null, 'Chicken Biriyani', 'Roast chicken drumstick, basmati rice, raita, chutney, papadam and crispy boiled egg.', 3600],
            [null, 'Traditional Prawn Curry', 'Sri Lankan prawn curry.', 3600],
        ]],
        ['Snacks & Bites', '/images/menu/snacks-bites.webp',
            'Batter fried calamari rings served on slate with chilli dipping sauce', [
            [null, 'Roasted Cashews', null, 1500],
            [null, 'Batter Fried Calamari', null, 2500],
            [null, 'Fried Beef', 'Served with onion rings and green chilli.', 2500],
            [null, 'Vegetable Pakora', 'Served with tomato sauce.', 2000],
            [null, 'Fish Rolls', 'Served with tomato sauce.', 300],
            [null, 'French Fries', null, 2000],
            [null, 'Fried Chicken', null, 2400],
            [null, 'Fried Lake Fish', null, 2200],
        ]],
        ['Devilled', '/images/menu/devilled.webp',
            'Sri Lankan devilled chicken stir fried with green chilli, onion and spring onion', [
            [null, 'Chicken Devilled', null, 2400],
            [null, 'Pork Devilled', null, 3000],
            [null, 'Prawn Devilled', null, 3300],
            [null, 'Fish Devilled', null, 3000],
            [null, 'Sausage Devilled', null, 2400],
        ]],
        ['Side Dishes', '/images/menu/side-dishes.webp',
            'Prawn fried rice served in a black bowl', [
            [null, 'Steamed Rice', null, 600],
            [null, 'Spicy Chicken Fried Rice', null, 2100],
            [null, 'Egg Fried Rice', null, 1800],
            [null, 'Vegetable Fried Rice', null, 1500],
            [null, 'Chicken Kottu', null, 2100],
            [null, 'Vegetable Kottu', null, 1500],
            [null, 'Chicken Noodles', null, 2100],
            [null, 'Vegetable Noodles', null, 1500],
        ]],
        ['Pasta', '/images/menu/pasta.webp',
            'A bowl of spaghetti served in a restaurant setting', [
            [null, 'Spicy Chilli Prawn Pasta', null, null],
            [null, 'Chicken Alfredo', null, null],
            [null, 'Cream Cheese Pasta', null, null],
            [null, 'Spaghetti Carbonara', null, null],
            [null, 'Vegetable Pasta', null, null],
        ]],
        ['Salad', '/images/menu/salad.webp',
            'A fresh salad bowl with avocado, tomato, chickpeas and red cabbage', [
            [null, 'Coleslaw Salad', null, null],
            [null, 'Chef Salad', null, null],
            [null, 'Green Salad', null, null],
            [null, 'Lemon Marinated Mixed Seafood Salad', null, null],
        ]],
        ['Kids Special', '/images/menu/kids-special.webp',
            'Fish and chips served with tartar sauce', [
            [null, 'Fish and Chips', null, null],
            [null, 'Nutella Roti', null, null],
            [null, 'Chicken Nuggets & Home Made Fries', null, null],
        ]],
        ['Dessert', '/images/menu/dessert.webp',
            'A selection of ice cream served in a coupe glass', [
            [null, 'Watalappam', null, null],
            [null, 'Fresh Fruit Platter', null, null],
            [null, 'Deep Fried Banana Fritters', null, null],
            [null, 'Curd with Honey', null, null],
            [null, 'Selection of Ice Cream', 'Two scoops: vanilla, strawberry or chocolate.', null],
        ]],
        ['Beverages', '/images/menu/beverages.webp',
            'Freshly pressed tropical fruit juices being poured into glasses', [
            ['Tea', 'Green Tea', null, null],
            ['Tea', 'Black Tea', null, null],
            ['Tea', 'Milk Tea', null, null],
            ['Coffee', 'Espresso', null, null],
            ['Coffee', 'Double Espresso', null, null],
            ['Coffee', 'Cappuccino', null, null],
            ['Coffee', 'Latte Macchiato', null, null],
            ['Coffee', 'Caffè Americano', null, null],
            ['Fresh Juice', 'Watermelon Juice', null, null],
            ['Fresh Juice', 'Passion Fruit Juice', 'Seasonal.', null],
            ['Fresh Juice', 'Lime Juice', null, null],
            ['Fresh Juice', 'Avocado Juice', null, null],
            ['Fresh Juice', 'Dragon Fruit Juice', 'Seasonal.', null],
            ['Fresh Juice', 'Mixed Fruit Juice', null, null],
            ['Fresh Juice', 'Papaya Juice', null, null],
            ['Fresh Juice', 'King Coconut', null, null],
            ['Soft Drinks', 'Coca-Cola', null, 300],
            ['Soft Drinks', 'Sprite', null, 300],
            ['Soft Drinks', 'Soda', null, 300],
            ['Soft Drinks', 'Cream Soda', null, 300],
            ['Soft Drinks', 'Necto', null, 300],
            ['Soft Drinks', 'Ginger Beer', null, 300],
        ]],
    ];
}

function rooms_seed_data(): array
{
    return [
        ['no' => '101', 'tag' => 'Peaceful Retreat', 'name' => 'Twin Bed Room',
            'desc' => 'Elegantly designed for comfort and relaxation, featuring two cozy single beds with serene backyard garden views.',
            'beds' => '2 Single Beds', 'view' => 'Garden View', 'price' => 20000, 'shots' => 3],
        ['no' => '102', 'tag' => 'VIP', 'name' => 'VIP Family Room',
            'desc' => "Ultimate family comfort with a king-size bed, children's room, private terrace dining, and garden views.",
            'beds' => 'King + Single Bed', 'view' => 'Front Garden & Terrace', 'price' => 30000, 'shots' => 10],
        ['no' => '103', 'tag' => 'Luxury', 'name' => 'Luxury Single Room',
            'desc' => 'An elegantly appointed single room with private balcony pool views, shared lounge, and terrace dining access.',
            'beds' => '1 Single Bed', 'view' => 'Pool & Garden View', 'price' => 18000, 'shots' => 3],
        ['no' => '104', 'tag' => 'Deluxe', 'name' => 'Deluxe Double Room',
            'desc' => 'Spacious deluxe room with queen and single beds, sofa set, and shared terrace dining with garden views.',
            'beds' => 'Queen + Single Bed', 'view' => 'Front Garden', 'price' => 20000, 'shots' => 4],
        ['no' => '105', 'tag' => 'Suite', 'name' => 'Entertaining Suite Room',
            'desc' => 'A stunning suite with king bed, private terrace surrounded by a charming flower garden, elegance meets tranquility.',
            'beds' => '1 King Bed', 'view' => 'Private Flower Garden', 'price' => 25000, 'shots' => 4],
        ['no' => '106', 'tag' => 'Deluxe', 'name' => 'Deluxe Family Room',
            'desc' => 'A spacious family room with private balcony offering rare views of ancient pagodas and a tranquil lake.',
            'beds' => 'King + Single Bed', 'view' => 'Pagoda & Lake View', 'price' => 35000, 'shots' => 4],
    ];
}

function gallery_seed_data(): array
{
    return [
        ['cat' => 'Rooms',    'caption' => 'Twin Bed Room',        'src' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Dining',   'caption' => 'Fine Dining',          'src' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Grounds',  'caption' => 'Infinity Pool',        'src' => '/images/amenities/infinity-pool.webp'],
        ['cat' => 'Wellness', 'caption' => 'Ayurvedic Spa',        'src' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Rooms',    'caption' => 'VIP Family Room',      'src' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Grounds',  'caption' => 'Terrace Garden',       'src' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Dining',   'caption' => 'Signature Plating',    'src' => 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Wellness', 'caption' => 'Fitness Center',       'src' => '/images/amenities/fitness-center.webp'],
        ['cat' => 'Rooms',    'caption' => 'Entertaining Suite',   'src' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Grounds',  'caption' => 'Lakeside View',        'src' => 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Dining',   'caption' => 'Tea Service',          'src' => 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80'],
        ['cat' => 'Rooms',    'caption' => 'Deluxe Family Room',   'src' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'],
    ];
}

/** Dish slugs that have a photo at public/images/dishes/<slug>.webp (mirrors src/lib/menu.ts DISH_IMAGES). */
function dish_image_slugs(): array
{
    return [
        'a-full-english', 'avocado-juice', 'avocado-toast', 'batter-fried-calamari',
        'black-pork-curry-with-coconut-roti', 'black-tea', 'caff-americano', 'cappuccino',
        'chef-salad', 'chicken-alfredo', 'chicken-biriyani', 'chicken-devilled', 'chicken-kottu',
        'chicken-noodles', 'chicken-nuggets-home-made-fries', 'coca-cola', 'coleslaw-salad',
        'cream-cheese-pasta', 'cream-soda', 'crumbed-fried-chicken', 'crumbed-fried-fish',
        'curd-with-honey', 'deep-fried-banana-fritters', 'double-espresso', 'dragon-fruit-juice',
        'egg-fried-rice', 'espresso', 'fish-and-chips', 'fish-devilled', 'fish-rolls',
        'french-fries', 'fresh-fruit-platter', 'fried-beef', 'fried-chicken', 'fruit-juice',
        'fruit-plate', 'ginger-beer', 'green-salad', 'green-tea', 'grilled-chicken', 'grilled-fish',
        'herbal-porridge', 'king-coconut', 'latte-macchiato', 'lemon-marinated-mixed-seafood-salad',
        'lime-juice', 'milk-rice', 'milk-tea', 'mixed-fruit-juice', 'necto', 'nutella-roti',
        'pancake', 'papaya-juice', 'passion-fruit-juice', 'pol-roti', 'pork-devilled',
        'prawn-devilled', 'pumpkin-soup-platter', 'rice-curry-with-four-vegetables',
        'roasted-cashews', 'sausage-devilled', 'selection-of-ice-cream', 'soda',
        'spaghetti-carbonara', 'spicy-chicken-fried-rice', 'spicy-chilli-prawn-pasta', 'sprite',
        'sri-lankan-rice-curry', 'steamed-rice', 'string-hoppers', 'super-green-omelette',
        'the-b-b-q', 'thosai', 'toast-with-butter-jam', 'traditional-prawn-curry',
        'vegetable-fried-rice', 'vegetable-kottu', 'vegetable-noodles', 'vegetable-pakora',
        'vegetable-pasta', 'waffles', 'watalappam', 'watermelon-juice', 'white-basmati-rice',
        'white-rice', 'yellow-rice', 'yellow-rice-beetroot',
    ];
}
