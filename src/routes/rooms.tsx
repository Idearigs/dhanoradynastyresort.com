import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, Eye, X } from "lucide-react";
import { PageHero } from "../components/site/Section";

const HERO = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80";

type Room = {
  no: string;
  tag: string;
  name: string;
  desc: string;
  beds: string;
  view: string;
  img: string;
};

const rooms: Room[] = [
  { no: "101", tag: "Peaceful Retreat", name: "Twin Bed Room", desc: "Elegantly designed for comfort and relaxation, featuring two cozy single beds with serene backyard garden views.", beds: "2 Single Beds", view: "Garden View", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80" },
  { no: "102", tag: "VIP", name: "VIP Family Room", desc: "Ultimate family comfort with a king-size bed, children's room, private terrace dining, and garden views.", beds: "King + Single Bed", view: "Front Garden & Terrace", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80" },
  { no: "103", tag: "Luxury", name: "Luxury Single Room", desc: "An elegantly appointed single room with private balcony pool views, shared lounge, and terrace dining access.", beds: "1 Single Bed", view: "Pool & Garden View", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" },
  { no: "104", tag: "Deluxe", name: "Deluxe Double Room", desc: "Spacious deluxe room with queen and single beds, sofa set, and shared terrace dining with garden views.", beds: "Queen + Single Bed", view: "Front Garden", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
  { no: "105", tag: "Suite", name: "Entertaining Suite Room", desc: "A stunning suite with king bed, private terrace surrounded by a charming flower garden — elegance meets tranquility.", beds: "1 King Bed", view: "Private Flower Garden", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80" },
  { no: "106", tag: "Deluxe", name: "Deluxe Family Room", desc: "A spacious family room with private balcony offering rare views of ancient pagodas and a tranquil lake.", beds: "King + Single Bed", view: "Pagoda & Lake View", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" },
];

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms — Dhanora Dynasty Resort" },
      { name: "description", content: "Six uniquely designed rooms blending heritage elegance with modern comfort." },
      { property: "og:title", content: "Rooms — Dhanora Dynasty Resort" },
      { property: "og:description", content: "Comfort, elegance & heritage in every room." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Rooms,
});

function Rooms() {
  const [active, setActive] = useState<Room | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Our Rooms"
        title="Comfort, Elegance & Heritage"
        subtitle="A Room for Every Occasion"
        image={HERO}
      />

      <section className="py-20 px-6 bg-background">
        <p className="mx-auto max-w-3xl text-center text-muted-foreground leading-relaxed text-lg mb-16">
          Each of our six uniquely designed rooms blends heritage elegance with modern comfort —
          crafted to offer you a truly memorable stay at Dhanora Dynasty.
        </p>

        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((r) => (
            <article key={r.no} className="group overflow-hidden rounded-2xl bg-surface border border-border hover:shadow-elegant transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={r.img} alt={r.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute top-4 left-4 rounded-full bg-primary-dark/85 px-3 py-1 text-xs font-medium text-accent">
                  Room {r.no}
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary-dark">
                  {r.tag}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-primary mb-3">{r.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">{r.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs text-primary">
                    <BedDouble className="size-3.5 text-accent" /> {r.beds}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs text-primary">
                    <Eye className="size-3.5 text-accent" /> {r.view}
                  </span>
                </div>
                <button
                  onClick={() => setActive(r)}
                  className="mt-6 w-full rounded-full border border-primary px-5 py-2.5 text-sm text-primary hover:bg-primary hover:text-ivory transition-colors"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-primary-dark" />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-ivory">
          <p className="eyebrow mb-4">Reserve Your Stay</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-5">Ready to Experience Royalty?</h2>
          <p className="text-ivory/80 text-lg">Contact us to check availability and reserve your room today.</p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium text-primary-dark hover:bg-accent-soft transition-colors"
          >
            Make a Reservation
          </Link>
        </div>
      </section>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-primary-dark/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-surface rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-primary-dark/80 text-ivory hover:bg-primary transition-colors"
            >
              <X className="size-5" />
            </button>
            <img src={active.img} alt={active.name} className="w-full h-72 object-cover" />
            <div className="p-8">
              <p className="eyebrow mb-2">Room {active.no} · {active.tag}</p>
              <h3 className="font-serif text-3xl text-primary mb-4">{active.name}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{active.desc}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Beds</p>
                  <p className="mt-1 text-primary font-medium">{active.beds}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">View</p>
                  <p className="mt-1 text-primary font-medium">{active.view}</p>
                </div>
              </div>
              <a
                href="https://wa.me/94769725255"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-accent px-7 py-3 text-primary-dark font-medium hover:bg-accent-soft transition-colors"
              >
                Inquire About This Room
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
