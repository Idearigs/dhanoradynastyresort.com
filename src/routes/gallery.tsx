import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "../components/site/Section";

const HERO = "/images/gallery/aerial.webp";

type Item = {
  src: string;
  cat: "Rooms" | "Dining" | "Interiors" | "Grounds" | "Fitness";
  caption: string;
};

// Real photography of Dhanora Dynasty Resort only — no stock imagery.
// Rooms = guest bedrooms only. Dining = shots that show a dining table.
// Lounges, bar, study, hall & detail shots live under Interiors.
const items: Item[] = [
  { src: "/images/home/intro-villa.webp", cat: "Grounds", caption: "The Villa & Poolside" },
  { src: "/images/rooms/101-1.webp", cat: "Rooms", caption: "Twin Bed Room" },
  { src: "/images/about/heritage-2.webp", cat: "Interiors", caption: "Lounge & Private Bar" },
  { src: "/images/dining/dining-room.webp", cat: "Dining", caption: "Private Dining Room" },
  { src: "/images/dining/rooftop-dining.webp", cat: "Dining", caption: "Rooftop Dining Terrace" },
  { src: "/images/dining/rooftop-view.webp", cat: "Dining", caption: "Rooftop Terrace with a View" },
  { src: "/images/rooms/102-1.webp", cat: "Rooms", caption: "VIP Family Room" },
  { src: "/images/amenities/infinity-pool.webp", cat: "Grounds", caption: "Poolside" },
  { src: "/images/rooms/105-1.webp", cat: "Rooms", caption: "Entertaining Suite Room" },
  { src: "/images/amenities/smart-kitchen-dining.webp", cat: "Grounds", caption: "Dining Pavilion" },
  { src: "/images/home/intro-terrace.webp", cat: "Grounds", caption: "Terrace Lounge" },
  { src: "/images/rooms/104-1.webp", cat: "Rooms", caption: "Deluxe Double Room" },
  { src: "/images/gallery/pavilion.webp", cat: "Grounds", caption: "Open-Air Pavilion" },
  { src: "/images/amenities/fitness-center.webp", cat: "Fitness", caption: "Fitness Center" },
  { src: "/images/rooms/103-1.webp", cat: "Rooms", caption: "Luxury Single Room" },
  { src: "/images/about/heritage-4.webp", cat: "Grounds", caption: "Garden Swing Retreat" },
  { src: "/images/gallery/greenery.webp", cat: "Grounds", caption: "Tropical Greenery" },
  { src: "/images/rooms/106-1.webp", cat: "Rooms", caption: "Deluxe Family Room" },
  { src: "/images/about/heritage-3.webp", cat: "Grounds", caption: "Private Balcony" },
  { src: "/images/gallery/pink-fence.webp", cat: "Grounds", caption: "Painted Garden Pavilion" },
  { src: "/images/gallery/foliage.webp", cat: "Grounds", caption: "Tropical Blooms" },
  { src: "/images/home/intro-building.webp", cat: "Grounds", caption: "Aerial over the Villa" },

  // 2026 shoot — new set
  { src: "/images/gallery/set-villa-1.webp", cat: "Grounds", caption: "The Villa & Pool" },
  { src: "/images/gallery/set-grand-living.webp", cat: "Interiors", caption: "Grand Living Room" },
  { src: "/images/gallery/set-bar-staircase.webp", cat: "Interiors", caption: "The Bar & Staircase" },
  { src: "/images/gallery/set-poolside.webp", cat: "Grounds", caption: "Poolside" },
  { src: "/images/gallery/set-lounge-pool.webp", cat: "Interiors", caption: "Living Lounge" },
  { src: "/images/gallery/set-bar-dining.webp", cat: "Interiors", caption: "Bar & Lounge" },
  { src: "/images/gallery/set-garden-blooms.webp", cat: "Grounds", caption: "Garden in Bloom" },
  { src: "/images/gallery/set-gym-1.webp", cat: "Fitness", caption: "Fitness Center" },
  { src: "/images/gallery/set-family-lounge.webp", cat: "Interiors", caption: "Family Lounge" },
  { src: "/images/gallery/set-courtyard-lounge.webp", cat: "Grounds", caption: "Courtyard Lounge" },
  { src: "/images/gallery/set-the-bar.webp", cat: "Interiors", caption: "The Bar" },
  { src: "/images/gallery/set-balcony-view.webp", cat: "Grounds", caption: "Balcony View" },
  { src: "/images/gallery/set-study.webp", cat: "Interiors", caption: "The Study" },
  { src: "/images/gallery/set-lounge-bar.webp", cat: "Interiors", caption: "Lounge Bar" },
  { src: "/images/gallery/set-garden-swing.webp", cat: "Grounds", caption: "Garden Swing" },
  { src: "/images/gallery/set-gym-2.webp", cat: "Fitness", caption: "Fitness Studio" },
  { src: "/images/gallery/set-lounge-corner.webp", cat: "Interiors", caption: "Lounge Corner" },
  { src: "/images/gallery/set-bar-corner.webp", cat: "Interiors", caption: "Bar Corner" },
  { src: "/images/gallery/set-terrace-loungers.webp", cat: "Grounds", caption: "Terrace Loungers" },
  { src: "/images/gallery/set-sunset.webp", cat: "Grounds", caption: "Sunset over Anuradhapura" },
  { src: "/images/gallery/set-bar-details.webp", cat: "Interiors", caption: "Bar Details" },
  { src: "/images/gallery/set-bathroom.webp", cat: "Interiors", caption: "En-Suite Bathroom" },
  { src: "/images/gallery/set-garden-path.webp", cat: "Grounds", caption: "Garden Path" },
  { src: "/images/gallery/set-evening-swing.webp", cat: "Grounds", caption: "Evening Swing" },
  { src: "/images/gallery/set-entrance-hall.webp", cat: "Interiors", caption: "Entrance Hall" },
  { src: "/images/gallery/set-grounds-exterior.webp", cat: "Grounds", caption: "The Grounds" },
  { src: "/images/gallery/set-balcony-dusk.webp", cat: "Grounds", caption: "Balcony at Dusk" },
  { src: "/images/gallery/set-heritage-details.webp", cat: "Interiors", caption: "Heritage Details" },
  { src: "/images/gallery/set-villa-2.webp", cat: "Grounds", caption: "Villa Exterior" },
];

const cats = ["All", "Rooms", "Dining", "Interiors", "Grounds", "Fitness"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Dhanora Dynasty Resort" },
      {
        name: "description",
        content: "Moments at Dhanora Dynasty — rooms, dining, grounds, and wellness.",
      },
      { property: "og:title", content: "Gallery — Dhanora Dynasty Resort" },
      {
        property: "og:description",
        content: "Imagery of our luxury heritage retreat in Anuradhapura.",
      },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = filter === "All" ? items : items.filter((i) => i.cat === filter);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, visible.length]);

  return (
    <>
      <PageHero title="Gallery" subtitle="Moments at Dhanora Dynasty" image={HERO} />

      <section className="py-16 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  filter === c
                    ? "bg-primary text-ivory border-primary"
                    : "border-border text-muted-foreground hover:border-accent hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {visible.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setLightbox(i)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-none bg-surface"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-5 text-left text-ivory">
                    <p className="text-xs uppercase tracking-widest text-accent">{item.cat}</p>
                    <p className="font-serif text-lg">{item.caption}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal-deep/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 grid size-12 place-items-center rounded-full border border-accent/30 text-ivory hover:bg-accent hover:text-charcoal transition-colors"
          >
            <X className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
            }}
            aria-label="Previous"
            className="absolute left-4 md:left-10 grid size-12 place-items-center rounded-full border border-accent/30 text-ivory hover:bg-accent hover:text-charcoal transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
            }}
            aria-label="Next"
            className="absolute right-4 md:right-10 grid size-12 place-items-center rounded-full border border-accent/30 text-ivory hover:bg-accent hover:text-charcoal transition-colors"
          >
            <ChevronRight className="size-6" />
          </button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={visible[lightbox].src}
              alt={visible[lightbox].caption}
              className="w-full max-h-[80vh] object-contain rounded-none"
            />
            <figcaption className="mt-4 text-center text-ivory">
              <p className="font-serif text-lg">{visible[lightbox].caption}</p>
              <p className="text-sm text-ivory/60 mt-1">
                {lightbox + 1} / {visible.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
