/**
 * The resort's real menu, transcribed from the owner's printed menu (July 2026).
 * Prices are deliberately not published on the site — see content/04-menu/menu.md
 * for the priced source of truth used by the admin panel.
 *
 * Shape mirrors the MenuItem contract in docs/PROJECT-PLAN.md so this module can be
 * swapped for the API response without touching the components.
 */
export type MenuItem = {
  category: MenuCategory;
  /** Optional sub-heading within a category (e.g. "Sri Lankan" under Breakfast). */
  group?: string;
  name: string;
  description?: string;
};

export const MENU_CATEGORIES = [
  "Breakfast",
  "Rice & Curry",
  "Main Course",
  "Snacks & Bites",
  "Devilled",
  "Side Dishes",
  "Pasta",
  "Salad",
  "Kids Special",
  "Dessert",
  "Beverages",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

/**
 * Banner image per category. Sourced from Unsplash (free for commercial use);
 * photographer credits in public/images/menu/CREDITS.md.
 * Alt text is descriptive rather than decorative — these are indexed.
 */
export const CATEGORY_IMAGE: Record<MenuCategory, { src: string; alt: string }> = {
  Breakfast: {
    src: "/images/menu/breakfast.webp",
    alt: "A Sri Lankan breakfast plate of rice with tempered vegetables and green chilli",
  },
  "Rice & Curry": {
    src: "/images/menu/rice-curry.webp",
    alt: "Sri Lankan rice and curry served in clay pots with dhal, green beans and sambol",
  },
  "Main Course": {
    src: "/images/menu/main-course.webp",
    alt: "Grilled chicken on a wooden board with lemon, rosemary and butter vegetables",
  },
  "Snacks & Bites": {
    src: "/images/menu/snacks-bites.webp",
    alt: "Batter fried calamari rings served on slate with chilli dipping sauce",
  },
  Devilled: {
    src: "/images/menu/devilled.webp",
    alt: "Sri Lankan devilled chicken stir fried with green chilli, onion and spring onion",
  },
  "Side Dishes": {
    src: "/images/menu/side-dishes.webp",
    alt: "Prawn fried rice served in a black bowl",
  },
  Pasta: {
    src: "/images/menu/pasta.webp",
    alt: "A bowl of spaghetti served in a restaurant setting",
  },
  Salad: {
    src: "/images/menu/salad.webp",
    alt: "A fresh salad bowl with avocado, tomato, chickpeas and red cabbage",
  },
  "Kids Special": {
    src: "/images/menu/kids-special.webp",
    alt: "Fish and chips served with tartar sauce",
  },
  Dessert: {
    src: "/images/menu/dessert.webp",
    alt: "A selection of ice cream served in a coupe glass",
  },
  Beverages: {
    src: "/images/menu/beverages.webp",
    alt: "Freshly pressed tropical fruit juices being poured into glasses",
  },
};

export const MENU: MenuItem[] = [
  // ── Breakfast ──────────────────────────────────────────────────────────────
  { category: "Breakfast", group: "Continental", name: "Herbal Porridge" },
  { category: "Breakfast", group: "Continental", name: "Fruit Juice" },
  { category: "Breakfast", group: "Continental", name: "Fruit Plate" },
  { category: "Breakfast", group: "Continental", name: "Curd with Honey" },
  { category: "Breakfast", group: "Continental", name: "Pancake" },
  { category: "Breakfast", group: "Continental", name: "Toast with Butter & Jam" },
  {
    category: "Breakfast",
    group: "Sri Lankan",
    name: "Pol Roti",
    description: "Chicken curry, dhal curry and katta sambol.",
  },
  {
    category: "Breakfast",
    group: "Sri Lankan",
    name: "Milk Rice",
    description: "Chicken curry, dhal curry and katta sambol.",
  },
  {
    category: "Breakfast",
    group: "Sri Lankan",
    name: "String Hoppers",
    description: "Chicken or fish curry, dhal or potato curry and coconut sambol.",
  },
  {
    category: "Breakfast",
    group: "Sri Lankan",
    name: "Sri Lankan Rice & Curry",
    description: "Chicken or fish curry, dhal curry, coconut sambol and papadam.",
  },
  {
    category: "Breakfast",
    group: "English",
    name: "A Full English",
    description:
      "Sausage, bacon, sautéed potato and your choice of fried, scrambled, poached or boiled egg, or a Sri Lankan omelette.",
  },
  {
    category: "Breakfast",
    group: "English",
    name: "Waffles",
    description: "Caramelised banana and kithul treacle.",
  },
  {
    category: "Breakfast",
    group: "English",
    name: "Super Green Omelette",
    description: "Spinach, basil and parsley.",
  },
  {
    category: "Breakfast",
    group: "English",
    name: "Avocado Toast",
    description: "Mashed avocado on toast, served with a poached egg.",
  },

  // ── Rice & Curry ───────────────────────────────────────────────────────────
  {
    category: "Rice & Curry",
    name: "White Basmati Rice",
    description:
      "Seer fish devilled or black pork curry, dhal curry, green beans tempered, coconut sambol, fried chilli and papadam.",
  },
  {
    category: "Rice & Curry",
    name: "Yellow Rice",
    description: "Chicken or fish curry, potato tempered, green bean curry, cutlet and papadam.",
  },
  {
    category: "Rice & Curry",
    name: "White Rice",
    description:
      "Mushroom tempered, dhal curry, brinjal moju, coconut sambol, fried chilli and papadam.",
  },
  {
    category: "Rice & Curry",
    name: "Yellow Rice & Beetroot",
    description:
      "Beetroot curry, kola sambol, dhal tempered, fried chicken or egg omelette, cutlet and papadam.",
  },
  {
    category: "Rice & Curry",
    name: "Pumpkin Soup Platter",
    description:
      "Pumpkin soup, vegetable fried rice, vegetable chopsuey and fried chicken with devilled chilli paste.",
  },
  { category: "Rice & Curry", name: "Thosai", description: "Sambar and green chutney." },
  {
    category: "Rice & Curry",
    name: "String Hoppers",
    description: "Dhal curry, chicken curry and coconut sambol.",
  },
  { category: "Rice & Curry", name: "Rice & Curry with Four Vegetables" },

  // ── Main Course ────────────────────────────────────────────────────────────
  {
    category: "Main Course",
    name: "Grilled Chicken",
    description: "Served with BBQ sauce, garlic rice and butter vegetables.",
  },
  {
    category: "Main Course",
    name: "Grilled Fish",
    description: "Served with lemon butter sauce, french fries and butter vegetables.",
  },
  {
    category: "Main Course",
    name: "The B.B.Q.",
    description:
      "Chicken, pork, fish, prawns and jumbo sausage with BBQ sauce, mixed vegetable salad, french fries and garlic rice.",
  },
  {
    category: "Main Course",
    name: "Crumbed Fried Chicken",
    description: "Served with chilli sauce, mashed potato and butter vegetables.",
  },
  {
    category: "Main Course",
    name: "Crumbed Fried Fish",
    description: "Served with tartar sauce, mashed potato and butter vegetables.",
  },
  {
    category: "Main Course",
    name: "Black Pork Curry with Coconut Roti",
    description: "Sri Lankan style black pork curry served with coconut roti and coconut sambol.",
  },
  {
    category: "Main Course",
    name: "Chicken Biriyani",
    description:
      "Roast chicken drumstick, basmati rice, raita, chutney, papadam and crispy boiled egg.",
  },
  {
    category: "Main Course",
    name: "Traditional Prawn Curry",
    description: "Sri Lankan prawn curry.",
  },

  // ── Snacks & Bites ─────────────────────────────────────────────────────────
  { category: "Snacks & Bites", name: "Roasted Cashews" },
  { category: "Snacks & Bites", name: "Batter Fried Calamari" },
  {
    category: "Snacks & Bites",
    name: "Fried Beef",
    description: "Served with onion rings and green chilli.",
  },
  {
    category: "Snacks & Bites",
    name: "Vegetable Pakora",
    description: "Served with tomato sauce.",
  },
  { category: "Snacks & Bites", name: "Fish Rolls", description: "Served with tomato sauce." },
  { category: "Snacks & Bites", name: "French Fries" },
  { category: "Snacks & Bites", name: "Fried Chicken" },
  { category: "Snacks & Bites", name: "Fried Lake Fish" },

  // ── Devilled ───────────────────────────────────────────────────────────────
  { category: "Devilled", name: "Chicken Devilled" },
  { category: "Devilled", name: "Pork Devilled" },
  { category: "Devilled", name: "Prawn Devilled" },
  { category: "Devilled", name: "Fish Devilled" },
  { category: "Devilled", name: "Sausage Devilled" },

  // ── Side Dishes ────────────────────────────────────────────────────────────
  { category: "Side Dishes", name: "Steamed Rice" },
  { category: "Side Dishes", name: "Spicy Chicken Fried Rice" },
  { category: "Side Dishes", name: "Egg Fried Rice" },
  { category: "Side Dishes", name: "Vegetable Fried Rice" },
  { category: "Side Dishes", name: "Chicken Kottu" },
  { category: "Side Dishes", name: "Vegetable Kottu" },
  { category: "Side Dishes", name: "Chicken Noodles" },
  { category: "Side Dishes", name: "Vegetable Noodles" },

  // ── Pasta ──────────────────────────────────────────────────────────────────
  { category: "Pasta", name: "Spicy Chilli Prawn Pasta" },
  { category: "Pasta", name: "Chicken Alfredo" },
  { category: "Pasta", name: "Cream Cheese Pasta" },
  { category: "Pasta", name: "Spaghetti Carbonara" },
  { category: "Pasta", name: "Vegetable Pasta" },

  // ── Salad ──────────────────────────────────────────────────────────────────
  { category: "Salad", name: "Coleslaw Salad" },
  { category: "Salad", name: "Chef Salad" },
  { category: "Salad", name: "Green Salad" },
  { category: "Salad", name: "Lemon Marinated Mixed Seafood Salad" },

  // ── Kids Special ───────────────────────────────────────────────────────────
  { category: "Kids Special", name: "Fish and Chips" },
  { category: "Kids Special", name: "Nutella Roti" },
  { category: "Kids Special", name: "Chicken Nuggets & Home Made Fries" },

  // ── Dessert ────────────────────────────────────────────────────────────────
  { category: "Dessert", name: "Watalappam" },
  { category: "Dessert", name: "Fresh Fruit Platter" },
  { category: "Dessert", name: "Deep Fried Banana Fritters" },
  { category: "Dessert", name: "Curd with Honey" },
  {
    category: "Dessert",
    name: "Selection of Ice Cream",
    description: "Two scoops: vanilla, strawberry or chocolate.",
  },

  // ── Beverages ──────────────────────────────────────────────────────────────
  { category: "Beverages", group: "Tea", name: "Green Tea" },
  { category: "Beverages", group: "Tea", name: "Black Tea" },
  { category: "Beverages", group: "Tea", name: "Milk Tea" },
  { category: "Beverages", group: "Coffee", name: "Espresso" },
  { category: "Beverages", group: "Coffee", name: "Double Espresso" },
  { category: "Beverages", group: "Coffee", name: "Cappuccino" },
  { category: "Beverages", group: "Coffee", name: "Latte Macchiato" },
  { category: "Beverages", group: "Coffee", name: "Caffè Americano" },
  { category: "Beverages", group: "Fresh Juice", name: "Watermelon Juice" },
  {
    category: "Beverages",
    group: "Fresh Juice",
    name: "Passion Fruit Juice",
    description: "Seasonal.",
  },
  { category: "Beverages", group: "Fresh Juice", name: "Lime Juice" },
  { category: "Beverages", group: "Fresh Juice", name: "Avocado Juice" },
  {
    category: "Beverages",
    group: "Fresh Juice",
    name: "Dragon Fruit Juice",
    description: "Seasonal.",
  },
  { category: "Beverages", group: "Fresh Juice", name: "Mixed Fruit Juice" },
  { category: "Beverages", group: "Fresh Juice", name: "Papaya Juice" },
  { category: "Beverages", group: "Fresh Juice", name: "King Coconut" },
  { category: "Beverages", group: "Soft Drinks", name: "Coca-Cola" },
  { category: "Beverages", group: "Soft Drinks", name: "Sprite" },
  { category: "Beverages", group: "Soft Drinks", name: "Soda" },
  { category: "Beverages", group: "Soft Drinks", name: "Cream Soda" },
  { category: "Beverages", group: "Soft Drinks", name: "Necto" },
  { category: "Beverages", group: "Soft Drinks", name: "Ginger Beer" },
];

/** URL/DOM-safe id from a category name, e.g. "Rice & Curry" -> "rice-curry". */
export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Items of one category, split into their sub-groups in menu order. */
export function menuByGroup(category: MenuCategory): { group?: string; items: MenuItem[] }[] {
  const groups: { group?: string; items: MenuItem[] }[] = [];
  for (const item of MENU) {
    if (item.category !== category) continue;
    const last = groups[groups.length - 1];
    if (last && last.group === item.group) last.items.push(item);
    else groups.push({ group: item.group, items: [item] });
  }
  return groups;
}

/**
 * Dishes that have their own photo in public/images/dishes/<slug>.webp.
 * The rest fall back to their category banner — better a correct category shot than a
 * wrong dish shot. Credits: public/images/dishes/CREDITS.md
 */
const DISH_IMAGES = new Set([
  "a-full-english",
  "avocado-juice",
  "avocado-toast",
  "batter-fried-calamari",
  "black-pork-curry-with-coconut-roti",
  "black-tea",
  "caff-americano",
  "cappuccino",
  "chef-salad",
  "chicken-alfredo",
  "chicken-biriyani",
  "chicken-devilled",
  "chicken-kottu",
  "chicken-noodles",
  "chicken-nuggets-home-made-fries",
  "coca-cola",
  "coleslaw-salad",
  "cream-cheese-pasta",
  "cream-soda",
  "crumbed-fried-chicken",
  "crumbed-fried-fish",
  "curd-with-honey",
  "deep-fried-banana-fritters",
  "double-espresso",
  "dragon-fruit-juice",
  "egg-fried-rice",
  "espresso",
  "fish-and-chips",
  "fish-devilled",
  "fish-rolls",
  "french-fries",
  "fresh-fruit-platter",
  "fried-beef",
  "fried-chicken",
  "fruit-juice",
  "fruit-plate",
  "ginger-beer",
  "green-salad",
  "green-tea",
  "grilled-chicken",
  "grilled-fish",
  "herbal-porridge",
  "king-coconut",
  "latte-macchiato",
  "lemon-marinated-mixed-seafood-salad",
  "lime-juice",
  "milk-rice",
  "milk-tea",
  "mixed-fruit-juice",
  "necto",
  "nutella-roti",
  "pancake",
  "papaya-juice",
  "passion-fruit-juice",
  "pol-roti",
  "pork-devilled",
  "prawn-devilled",
  "pumpkin-soup-platter",
  "rice-curry-with-four-vegetables",
  "roasted-cashews",
  "sausage-devilled",
  "selection-of-ice-cream",
  "soda",
  "spaghetti-carbonara",
  "spicy-chicken-fried-rice",
  "spicy-chilli-prawn-pasta",
  "sprite",
  "sri-lankan-rice-curry",
  "steamed-rice",
  "string-hoppers",
  "super-green-omelette",
  "the-b-b-q",
  "thosai",
  "toast-with-butter-jam",
  "traditional-prawn-curry",
  "vegetable-fried-rice",
  "vegetable-kottu",
  "vegetable-noodles",
  "vegetable-pakora",
  "vegetable-pasta",
  "waffles",
  "watalappam",
  "watermelon-juice",
  "white-basmati-rice",
  "white-rice",
  "yellow-rice",
  "yellow-rice-beetroot",
]);

/** Photo for a dish, or null if it should fall back to the category banner. */
export function dishImage(item: MenuItem): string | null {
  const s = slug(item.name);
  return DISH_IMAGES.has(s) ? `/images/dishes/${s}.webp` : null;
}
