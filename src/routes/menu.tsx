import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "../components/site/Section";

const HERO = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80";

type Dish = { cat: string; name: string; desc: string };

const dishes: Dish[] = [
  { cat: "Appetizer", name: "Spring Rolls", desc: "Crispy golden rolls filled with fresh vegetables and aromatic herbs, served with sweet chili sauce." },
  { cat: "Appetizer", name: "Bruschetta", desc: "Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil." },
  { cat: "Appetizer", name: "Stuffed Mushrooms", desc: "Button mushrooms filled with herbed cheese and breadcrumbs, baked to perfection." },
  { cat: "Soup", name: "French Onion Soup", desc: "Classic caramelized onion soup topped with melted cheese and toasted croutons." },
  { cat: "Soup", name: "Cream of Mushroom", desc: "Rich and velvety mushroom soup with hints of thyme and cream." },
  { cat: "Soup", name: "Tomato Basil Soup", desc: "Fresh tomatoes simmered with basil, garlic, and a touch of cream." },
  { cat: "Main Course", name: "Grilled Salmon", desc: "Fresh Atlantic salmon grilled to perfection, served with lemon butter sauce and seasonal vegetables." },
  { cat: "Main Course", name: "Beef Tenderloin", desc: "Premium cut beef cooked to your preference, served with truffle mashed potatoes." },
  { cat: "Main Course", name: "Chicken Cordon Bleu", desc: "Tender chicken breast stuffed with ham and Swiss cheese, breaded and baked golden." },
  { cat: "Dessert", name: "Chocolate Lava Cake", desc: "Warm chocolate cake with a molten center, served with vanilla ice cream." },
  { cat: "Dessert", name: "Tiramisu", desc: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream." },
  { cat: "Dessert", name: "Crème Brûlée", desc: "Silky vanilla custard with a caramelized sugar crust." },
  { cat: "Drinks", name: "Fresh Juices", desc: "Orange, Apple, Pineapple, or Mixed Berry." },
  { cat: "Drinks", name: "Specialty Coffee", desc: "Cappuccino, Latte, Espresso, or Mocha." },
  { cat: "Drinks", name: "Iced Tea", desc: "Refreshing iced tea with lemon and mint." },
];

const cats = ["All", "Appetizer", "Soup", "Main Course", "Dessert", "Drinks"] as const;

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Dhanora Dynasty Resort" },
      { name: "description", content: "Savor the taste of tradition — appetizers, soups, mains, desserts, and drinks." },
      { property: "og:title", content: "Menu — Dhanora Dynasty Resort" },
      { property: "og:description", content: "Refined cuisine prepared by master chefs." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Menu,
});

function Menu() {
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const visible = filter === "All" ? dishes : dishes.filter((d) => d.cat === filter);

  const grouped = cats
    .filter((c) => c !== "All")
    .map((c) => ({ cat: c, items: visible.filter((d) => d.cat === c) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero title="Menu" subtitle="Savor the Taste of Tradition" image={HERO} />

      <section className="py-16 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-20 z-20 -mx-2 mb-12 flex flex-wrap justify-center gap-2 rounded-full bg-surface/90 backdrop-blur p-2 shadow-soft border border-border">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${
                  filter === c
                    ? "bg-primary text-ivory"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {grouped.map(({ cat, items }) => (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="hairline" />
                <h2 className="font-serif text-3xl text-primary">{cat}</h2>
                <span className="hairline flex-1" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((d) => (
                  <article
                    key={d.name}
                    className="group rounded-2xl border border-border bg-surface p-7 hover:border-accent/50 hover:shadow-soft transition-all"
                  >
                    <p className="eyebrow mb-2">{d.cat}</p>
                    <h3 className="font-serif text-xl text-primary mb-2">{d.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
