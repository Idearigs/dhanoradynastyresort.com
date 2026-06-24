import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "../components/site/Section";

const HERO = "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80";

type Item = { src: string; cat: "Rooms" | "Dining" | "Grounds" | "Wellness"; caption: string };

const items: Item[] = [
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80", cat: "Rooms", caption: "Twin Bed Room" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80", cat: "Dining", caption: "Fine Dining" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80", cat: "Grounds", caption: "Infinity Pool" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", cat: "Wellness", caption: "Ayurvedic Spa" },
  { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80", cat: "Rooms", caption: "VIP Family Room" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80", cat: "Grounds", caption: "Terrace Garden" },
  { src: "https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&w=1200&q=80", cat: "Dining", caption: "Signature Plating" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80", cat: "Wellness", caption: "Fitness Center" },
  { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", cat: "Rooms", caption: "Entertaining Suite" },
  { src: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80", cat: "Grounds", caption: "Lakeside View" },
  { src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80", cat: "Dining", caption: "Tea Service" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", cat: "Rooms", caption: "Deluxe Family Room" },
];

const cats = ["All", "Rooms", "Dining", "Grounds", "Wellness"] as const;

const heights = ["h-64", "h-80", "h-72", "h-96", "h-60", "h-80"];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Dhanora Dynasty Resort" },
      { name: "description", content: "Moments at Dhanora Dynasty — rooms, dining, grounds, and wellness." },
      { property: "og:title", content: "Gallery — Dhanora Dynasty Resort" },
      { property: "og:description", content: "Imagery of our luxury heritage retreat in Anuradhapura." },
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
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {visible.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setLightbox(i)}
                className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-surface relative"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className={`w-full ${heights[i % heights.length]} object-cover transition-transform duration-700 group-hover:scale-110`}
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
          className="fixed inset-0 z-[60] bg-primary-dark/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 grid size-12 place-items-center rounded-full border border-accent/30 text-ivory hover:bg-accent hover:text-primary-dark transition-colors"
          >
            <X className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
            }}
            aria-label="Previous"
            className="absolute left-4 md:left-10 grid size-12 place-items-center rounded-full border border-accent/30 text-ivory hover:bg-accent hover:text-primary-dark transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
            }}
            aria-label="Next"
            className="absolute right-4 md:right-10 grid size-12 place-items-center rounded-full border border-accent/30 text-ivory hover:bg-accent hover:text-primary-dark transition-colors"
          >
            <ChevronRight className="size-6" />
          </button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={visible[lightbox].src} alt={visible[lightbox].caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <figcaption className="mt-4 text-center text-ivory">
              <p className="font-serif text-lg">{visible[lightbox].caption}</p>
              <p className="text-sm text-ivory/60 mt-1">{lightbox + 1} / {visible.length}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
