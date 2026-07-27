<?php
/**
 * /api/menu/* — public menu read + admin CRUD.
 *
 * Public (no auth):
 *   GET  /menu                     -> categories with nested available items
 *                                     (NO prices — owner's instruction)
 * Admin (auth + CSRF on writes):
 *   GET    /menu/categories        -> all categories (incl. unpublished)
 *   POST   /menu/categories        -> create category
 *   PUT    /menu/categories/{id}   -> update category
 *   DELETE /menu/categories/{id}   -> delete category (cascades items)
 *   GET    /menu/items             -> all items (incl. price, unavailable)
 *   POST   /menu/items             -> create item
 *   PUT    /menu/items/{id}        -> update item
 *   DELETE /menu/items/{id}        -> delete item
 */

declare(strict_types=1);

function handle_menu(string $method, array $rest): void
{
    $sub = $rest[0] ?? '';
    $id  = isset($rest[1]) ? (int) $rest[1] : null;

    // ---- Public nested read -------------------------------------------------
    if ($sub === '' && $method === 'GET') {
        menu_public_read();
        return;
    }

    // ---- Admin: categories --------------------------------------------------
    if ($sub === 'categories') {
        switch ($method) {
            case 'GET':
                require_auth();
                json_response(['categories' => menu_all_categories()]);
                return;
            case 'POST':
                require_auth();
                require_csrf();
                menu_create_category();
                return;
            case 'PUT':
            case 'PATCH':
                require_auth();
                require_csrf();
                if (!$id) json_error('Category id required.', 400);
                menu_update_category($id);
                return;
            case 'DELETE':
                require_auth();
                require_csrf();
                if (!$id) json_error('Category id required.', 400);
                menu_delete('menu_categories', $id, 'Category');
                return;
        }
        json_error('Method not allowed.', 405);
    }

    // ---- Admin: items -------------------------------------------------------
    if ($sub === 'items') {
        switch ($method) {
            case 'GET':
                require_auth();
                menu_all_items();
                return;
            case 'POST':
                require_auth();
                require_csrf();
                menu_create_item();
                return;
            case 'PUT':
            case 'PATCH':
                require_auth();
                require_csrf();
                if (!$id) json_error('Item id required.', 400);
                menu_update_item($id);
                return;
            case 'DELETE':
                require_auth();
                require_csrf();
                if (!$id) json_error('Item id required.', 400);
                menu_delete('menu_items', $id, 'Item');
                return;
        }
        json_error('Method not allowed.', 405);
    }

    json_error('Not found.', 404);
}

// --- Public ------------------------------------------------------------------

function menu_public_read(): void
{
    $cats = db()->query(
        'SELECT id, name, slug, image_src, image_alt
           FROM menu_categories
          WHERE is_published = 1
          ORDER BY sort_order, id'
    )->fetchAll();

    $itemStmt = db()->prepare(
        'SELECT id, group_name, name, slug, description, image_src, image_alt
           FROM menu_items
          WHERE category_id = ? AND is_available = 1
          ORDER BY sort_order, id'
    );

    $out = [];
    foreach ($cats as $c) {
        $itemStmt->execute([$c['id']]);
        $items = array_map(static function ($i) {
            return [
                'id'          => (int) $i['id'],
                'group'       => $i['group_name'],
                'name'        => $i['name'],
                'slug'        => $i['slug'],
                'description' => $i['description'],
                // Per-dish photo; null lets the frontend fall back to the category banner.
                'image'       => $i['image_src'] ? ['src' => $i['image_src'], 'alt' => $i['image_alt']] : null,
            ];
        }, $itemStmt->fetchAll());

        $out[] = [
            'id'    => (int) $c['id'],
            'name'  => $c['name'],
            'slug'  => $c['slug'],
            'image' => $c['image_src'] ? ['src' => $c['image_src'], 'alt' => $c['image_alt']] : null,
            'items' => $items,
        ];
    }

    json_response(['categories' => $out]);
}

// --- Categories --------------------------------------------------------------

function menu_all_categories(): array
{
    $rows = db()->query(
        'SELECT id, name, slug, image_src, image_alt, sort_order, is_published
           FROM menu_categories ORDER BY sort_order, id'
    )->fetchAll();
    return array_map(static function ($c) {
        return [
            'id'          => (int) $c['id'],
            'name'        => $c['name'],
            'slug'        => $c['slug'],
            'imageSrc'    => $c['image_src'],
            'imageAlt'    => $c['image_alt'],
            'sortOrder'   => (int) $c['sort_order'],
            'isPublished' => (bool) $c['is_published'],
        ];
    }, $rows);
}

function menu_create_category(): void
{
    $b    = request_body();
    $name = field_string($b, 'name', true, 120);
    $slug = field_string($b, 'slug') ?? make_slug($name);

    $stmt = db()->prepare(
        'INSERT INTO menu_categories (name, slug, image_src, image_alt, sort_order, is_published)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $name,
        $slug,
        field_string($b, 'imageSrc', false, 255),
        field_string($b, 'imageAlt', false, 255),
        field_int($b, 'sortOrder') ?? 0,
        field_bool($b, 'isPublished', true) ? 1 : 0,
    ]);
    json_response(['id' => (int) db()->lastInsertId()], 201);
}

function menu_update_category(int $id): void
{
    $b = request_body();
    $name = field_string($b, 'name', true, 120);
    $stmt = db()->prepare(
        'UPDATE menu_categories
            SET name = ?, slug = ?, image_src = ?, image_alt = ?, sort_order = ?, is_published = ?
          WHERE id = ?'
    );
    $stmt->execute([
        $name,
        field_string($b, 'slug') ?? make_slug($name),
        field_string($b, 'imageSrc', false, 255),
        field_string($b, 'imageAlt', false, 255),
        field_int($b, 'sortOrder') ?? 0,
        field_bool($b, 'isPublished', true) ? 1 : 0,
        $id,
    ]);
    if ($stmt->rowCount() === 0 && !menu_row_exists('menu_categories', $id)) {
        json_error('Category not found.', 404);
    }
    json_response(['ok' => true]);
}

// --- Items -------------------------------------------------------------------

function menu_all_items(): void
{
    $categoryId = isset($_GET['category']) ? (int) $_GET['category'] : null;
    if ($categoryId) {
        $stmt = db()->prepare(
            'SELECT * FROM menu_items WHERE category_id = ? ORDER BY sort_order, id'
        );
        $stmt->execute([$categoryId]);
        $rows = $stmt->fetchAll();
    } else {
        $rows = db()->query('SELECT * FROM menu_items ORDER BY category_id, sort_order, id')->fetchAll();
    }
    json_response(['items' => array_map('menu_item_shape', $rows)]);
}

function menu_item_shape(array $i): array
{
    return [
        'id'          => (int) $i['id'],
        'categoryId'  => (int) $i['category_id'],
        'group'       => $i['group_name'],
        'name'        => $i['name'],
        'slug'        => $i['slug'],
        'description' => $i['description'],
        'price'       => $i['price'] !== null ? (float) $i['price'] : null,
        'imageSrc'    => $i['image_src'],
        'imageAlt'    => $i['image_alt'],
        'isAvailable' => (bool) $i['is_available'],
        'sortOrder'   => (int) $i['sort_order'],
    ];
}

function menu_create_item(): void
{
    $b          = request_body();
    $categoryId = field_int($b, 'categoryId', true, 1);
    if (!menu_row_exists('menu_categories', $categoryId)) {
        json_error('categoryId does not exist.', 422);
    }
    $name = field_string($b, 'name', true, 190);

    $stmt = db()->prepare(
        'INSERT INTO menu_items (category_id, group_name, name, slug, description, price, image_src, image_alt, is_available, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $categoryId,
        field_string($b, 'group', false, 120),
        $name,
        field_string($b, 'slug') ?? make_slug($name),
        field_string($b, 'description', false, 2000),
        field_decimal($b, 'price'),
        field_string($b, 'imageSrc', false, 255),
        field_string($b, 'imageAlt', false, 255),
        field_bool($b, 'isAvailable', true) ? 1 : 0,
        field_int($b, 'sortOrder') ?? 0,
    ]);
    json_response(['id' => (int) db()->lastInsertId()], 201);
}

function menu_update_item(int $id): void
{
    $b          = request_body();
    $categoryId = field_int($b, 'categoryId', true, 1);
    if (!menu_row_exists('menu_categories', $categoryId)) {
        json_error('categoryId does not exist.', 422);
    }
    $name = field_string($b, 'name', true, 190);

    $stmt = db()->prepare(
        'UPDATE menu_items
            SET category_id = ?, group_name = ?, name = ?, slug = ?, description = ?,
                price = ?, image_src = ?, image_alt = ?, is_available = ?, sort_order = ?
          WHERE id = ?'
    );
    $stmt->execute([
        $categoryId,
        field_string($b, 'group', false, 120),
        $name,
        field_string($b, 'slug') ?? make_slug($name),
        field_string($b, 'description', false, 2000),
        field_decimal($b, 'price'),
        field_string($b, 'imageSrc', false, 255),
        field_string($b, 'imageAlt', false, 255),
        field_bool($b, 'isAvailable', true) ? 1 : 0,
        field_int($b, 'sortOrder') ?? 0,
        $id,
    ]);
    if ($stmt->rowCount() === 0 && !menu_row_exists('menu_items', $id)) {
        json_error('Item not found.', 404);
    }
    json_response(['ok' => true]);
}

// --- Shared ------------------------------------------------------------------

function menu_delete(string $table, int $id, string $label): void
{
    // $table is a fixed literal from the router, never user input.
    $stmt = db()->prepare("DELETE FROM $table WHERE id = ?");
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        json_error("$label not found.", 404);
    }
    json_response(['ok' => true]);
}

function menu_row_exists(string $table, int $id): bool
{
    $stmt = db()->prepare("SELECT 1 FROM $table WHERE id = ? LIMIT 1");
    $stmt->execute([$id]);
    return (bool) $stmt->fetchColumn();
}
