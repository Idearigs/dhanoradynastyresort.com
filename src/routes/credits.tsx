import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHero } from "../components/site/Section";
import { ATTRACTION_CREDITS, DISH_CREDITS } from "../lib/credits";

const HERO =
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Image Credits — Dhanora Dynasty Resort" },
      {
        name: "description",
        content:
          "Photography credits and licence attributions for images used on the Dhanora Dynasty Resort website.",
      },
      // Not a page we want in search results — it exists to satisfy licence terms.
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Image Credits — Dhanora Dynasty Resort" },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Credits,
});

function Credits() {
  return (
    <>
      <PageHero
        eyebrow="Attributions"
        title="Image Credits"
        subtitle="With thanks to the photographers whose work we feature"
        image={HERO}
      />

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="leading-relaxed text-muted-foreground">
            We are grateful to the photographers who share their work openly. The photographs of
            Anuradhapura&rsquo;s ancient monuments and reservoirs in our{" "}
            <span className="text-primary">Discover the Ancient Kingdom</span> section come from{" "}
            <a
              href="https://commons.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              Wikimedia Commons
            </a>{" "}
            and are used under the Creative Commons and Free Art licences noted below.
          </p>

          <h2 className="mt-12 mb-6 font-serif text-2xl text-primary">
            Anuradhapura heritage &amp; reservoirs
          </h2>

          <ul className="divide-y divide-border overflow-hidden rounded-none border border-border bg-surface">
            {ATTRACTION_CREDITS.map((c) => (
              <li key={c.title} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-5">
                <span className="font-medium text-primary">{c.title}</span>
                <span className="text-sm text-muted-foreground">by {c.author}</span>
                <span className="ml-auto flex items-center gap-3 text-sm">
                  {c.licenseUrl ? (
                    <a
                      href={c.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer license"
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {c.license}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{c.license}</span>
                  )}
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Source for ${c.title} on Wikimedia Commons`}
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                  >
                    Source
                    <ExternalLink className="size-3.5" />
                  </a>
                </span>
              </li>
            ))}
          </ul>

          {DISH_CREDITS.length > 0 && (
            <>
              <h2 className="mt-12 mb-6 font-serif text-2xl text-primary">Food photography</h2>

              <ul className="divide-y divide-border overflow-hidden rounded-none border border-border bg-surface">
                {DISH_CREDITS.map((c) => (
                  <li key={c.title} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-5">
                    <span className="font-medium text-primary">{c.title}</span>
                    <span className="text-sm text-muted-foreground">by {c.author}</span>
                    <span className="ml-auto flex items-center gap-3 text-sm">
                      <a
                        href={c.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer license"
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {c.license}
                      </a>
                      <a
                        href={c.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Source for ${c.title} on Wikimedia Commons`}
                        className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                      >
                        Source
                        <ExternalLink className="size-3.5" />
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-12 mb-4 font-serif text-2xl text-primary">Other imagery</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              Photographs of our food, rooms and grounds are sourced from{" "}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Unsplash
              </a>{" "}
              and{" "}
              <a
                href="https://www.pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Pexels
              </a>
              , which grant a free licence for commercial use without attribution, along with
              photography of the resort and its surroundings. We are progressively replacing the
              stock imagery with photography of the resort itself.
            </p>
            <p className="leading-relaxed">
              The Booking.com, Agoda, Tripadvisor and Priceline logos are trademarks of their
              respective owners, shown only to indicate where our rooms may be booked.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
