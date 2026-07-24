import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "../components/site/Section";
import {
  CATEGORY_IMAGE,
  MENU_CATEGORIES,
  dishImage,
  menuByGroup,
  slug,
  type MenuCategory,
} from "../lib/menu";

const HERO =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80";

/** "All" shows every category stacked; otherwise one category at a time. */
const FILTERS = ["All", ...MENU_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Dhanora Dynasty Resort" },
      {
        name: "description",
        content:
          "Sri Lankan rice and curry, devilled dishes, kottu, biriyani, fresh seafood and international favourites — served daily at Dhanora Dynasty Resort, Anuradhapura.",
      },
      { property: "og:title", content: "Menu — Dhanora Dynasty Resort" },
      {
        property: "og:description",
        content: "A delicious blend of local Sri Lankan flavours and international dishes.",
      },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Menu,
});

function Menu() {
  const [filter, setFilter] = useState<Filter>("All");

  const shown: readonly MenuCategory[] =
    filter === "All" ? MENU_CATEGORIES : [filter as MenuCategory];

  return (
    <>
      <PageHero title="Menu" subtitle="Savor the Taste of Tradition" image={HERO} />

      <section className="bg-gradient-to-b from-background via-secondary/20 to-background px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            A delicious blend of local Sri Lankan flavours and international dishes, prepared fresh
            each day. Speak to us about dietary requirements, most dishes can be adapted.
          </p>

          <div className="glass sticky top-20 z-20 -mx-2 mb-14 flex flex-wrap justify-center gap-2 rounded-none p-2">
            {FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  filter === c
                    ? "bg-primary text-ivory shadow-soft ring-1 ring-accent/40"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {shown.map((cat) => (
            <div key={cat} id={slug(cat)} className="mb-20 last:mb-0">
              {/* Category banner with the heading over it, matching the home page's menu section. */}
              <div className="relative mb-10 overflow-hidden rounded-none">
                <img
                  src={CATEGORY_IMAGE[cat].src}
                  alt={CATEGORY_IMAGE[cat].alt}
                  width={1200}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full object-cover md:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-6 md:p-8">
                  <span className="hairline" />
                  <h2 className="font-serif text-3xl text-ivory md:text-4xl">{cat}</h2>
                </div>
              </div>

              {menuByGroup(cat).map((g) => (
                <div key={g.group ?? cat} className="mb-12 last:mb-0">
                  {g.group && (
                    <div className="mb-8 flex items-center gap-4">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/40" />
                      <p className="eyebrow whitespace-nowrap">{g.group}</p>
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/40" />
                    </div>
                  )}

                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {g.items.map((m) => (
                      <li
                        key={`${m.category}-${m.name}`}
                        className="group glass-card flex flex-col overflow-hidden rounded-none hover:-translate-y-1 hover:border-accent/60 hover:glass-card-hover"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={dishImage(m) ?? CATEGORY_IMAGE[cat].src}
                            alt={m.name}
                            width={400}
                            height={300}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/45 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <h3 className="font-serif text-base leading-snug text-primary">{m.name}</h3>
                          <span className="mt-1.5 h-px w-7 bg-accent/50 transition-all duration-500 group-hover:w-14" />
                          {m.description && (
                            <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                              {m.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <p className="mx-auto mt-16 max-w-3xl text-center text-sm text-muted-foreground">
            Prices are available on request and at the restaurant. Please ask our team about
            seasonal items and daily specials.
          </p>
        </div>
      </section>
    </>
  );
}
