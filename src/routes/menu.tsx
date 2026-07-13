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

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            A delicious blend of local Sri Lankan flavours and international dishes, prepared fresh
            each day. Speak to us about dietary requirements — most dishes can be adapted.
          </p>

          <div className="sticky top-20 z-20 -mx-2 mb-14 flex flex-wrap justify-center gap-2 rounded-3xl border border-border bg-surface/90 p-2 shadow-soft backdrop-blur">
            {FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  filter === c
                    ? "bg-primary text-ivory"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {shown.map((cat) => (
            <div key={cat} id={slug(cat)} className="mb-20 last:mb-0">
              <div className="mb-10 flex items-center gap-4">
                <span className="hairline" />
                <h2 className="font-serif text-3xl text-primary">{cat}</h2>
                <span className="hairline flex-1" />
              </div>

              {menuByGroup(cat).map((g) => (
                <div key={g.group ?? cat} className="mb-12 last:mb-0">
                  {g.group && (
                    <div className="mb-7 flex items-center gap-4">
                      <p className="eyebrow whitespace-nowrap">{g.group}</p>
                      <span className="h-px flex-1 bg-accent/30" />
                    </div>
                  )}

                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((m) => (
                      <li
                        key={`${m.category}-${m.name}`}
                        className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/50 hover:shadow-soft"
                      >
                        <div className="overflow-hidden">
                          <img
                            src={dishImage(m) ?? CATEGORY_IMAGE[cat].src}
                            alt={m.name}
                            width={400}
                            height={300}
                            loading="lazy"
                            decoding="async"
                            className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif text-lg text-primary">{m.name}</h3>
                          {m.description && (
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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
