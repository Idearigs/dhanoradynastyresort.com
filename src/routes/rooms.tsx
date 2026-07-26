import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BedDouble, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { PageHero } from "../components/site/Section";

const HERO =
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80";

/**
 * LKR is the authoritative price the resort charges. USD is shown as an approximation
 * for international guests and is derived from this single rate — update this one line
 * when the rate moves. Never quote USD as a firm price; the guest pays in LKR.
 */
const LKR_PER_USD = 335; // as of 13 July 2026

const lkr = (n: number) => `Rs. ${n.toLocaleString("en-LK")}`;
const usd = (n: number) => `$${Math.round(n / LKR_PER_USD).toLocaleString("en-US")}`;

type Room = {
  no: string;
  tag: string;
  name: string;
  desc: string;
  beds: string;
  view: string;
  /** Per night, in LKR. */
  price: number;
  /** How many shots this room has on disk. Defaults to 4; [0] is the card thumbnail. */
  shots?: number;
};

/** Room photos live at public/images/rooms/{no}-{n}.webp. Credits: CREDITS.md */
const photos = (no: string, shots = 4) =>
  Array.from({ length: shots }, (_, i) => `/images/rooms/${no}-${i + 1}.webp`);

const rooms: Room[] = [
  {
    no: "101",
    tag: "Peaceful Retreat",
    name: "Twin Bed Room",
    desc: "Elegantly designed for comfort and relaxation, featuring two cozy single beds with serene backyard garden views.",
    beds: "2 Single Beds",
    view: "Garden View",
    price: 20000,
    shots: 3,
  },
  {
    no: "102",
    tag: "VIP",
    name: "VIP Family Room",
    desc: "Ultimate family comfort with a king-size bed, children's room, private terrace dining, and garden views.",
    beds: "King + Single Bed",
    view: "Front Garden & Terrace",
    price: 30000,
    shots: 10,
  },
  {
    no: "103",
    tag: "Luxury",
    name: "Luxury Single Room",
    desc: "An elegantly appointed single room with private balcony pool views, shared lounge, and terrace dining access.",
    beds: "1 Single Bed",
    view: "Pool & Garden View",
    price: 18000,
    shots: 3,
  },
  {
    no: "104",
    tag: "Deluxe",
    name: "Deluxe Double Room",
    desc: "Spacious deluxe room with queen and single beds, sofa set, and shared terrace dining with garden views.",
    beds: "Queen + Single Bed",
    view: "Front Garden",
    price: 20000,
  },
  {
    no: "105",
    tag: "Suite",
    name: "Entertaining Suite Room",
    desc: "A stunning suite with king bed, private terrace surrounded by a charming flower garden, elegance meets tranquility.",
    beds: "1 King Bed",
    view: "Private Flower Garden",
    price: 25000,
  },
  {
    no: "106",
    tag: "Deluxe",
    name: "Deluxe Family Room",
    desc: "A spacious family room with private balcony offering rare views of ancient pagodas and a tranquil lake.",
    beds: "King + Single Bed",
    view: "Pagoda & Lake View",
    price: 35000,
  },
];

function RoomCarousel({ room }: { room: Room }) {
  const shots = photos(room.no, room.shots);
  const [i, setI] = useState(0);
  const go = (step: number) => setI((n) => (n + step + shots.length) % shots.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shots.length]);

  return (
    <div className="relative h-56 overflow-hidden bg-charcoal sm:h-72 md:h-full md:min-h-[30rem]">
      {shots.map((src, n) => (
        <img
          key={src}
          src={src}
          alt={`${room.name}, photo ${n + 1} of ${shots.length}`}
          width={1000}
          height={700}
          loading={n === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
            n === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-accent/30 bg-charcoal/60 text-ivory backdrop-blur-sm transition-colors hover:bg-accent hover:text-charcoal"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-accent/30 bg-charcoal/60 text-ivory backdrop-blur-sm transition-colors hover:bg-accent hover:text-charcoal"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {shots.map((src, n) => (
          <button
            key={src}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Go to photo ${n + 1}`}
            aria-current={n === i}
            className={`h-1.5 rounded-full transition-all ${
              n === i ? "w-6 bg-accent" : "w-1.5 bg-ivory/60 hover:bg-ivory"
            }`}
          />
        ))}
      </div>

      <span className="absolute bottom-3 right-4 rounded-full bg-charcoal/70 px-2.5 py-1 text-xs text-ivory/90">
        {i + 1} / {shots.length}
      </span>
    </div>
  );
}

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms — Dhanora Dynasty Resort" },
      {
        name: "description",
        content: "Six uniquely designed rooms blending heritage elegance with modern comfort.",
      },
      { property: "og:title", content: "Rooms — Dhanora Dynasty Resort" },
      { property: "og:description", content: "Comfort, elegance & heritage in every room." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Rooms,
});

function Rooms() {
  const [active, setActive] = useState<Room | null>(null);

  // The modal had no Escape handling before; the carousel adds arrow keys, so wire up Escape too.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

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
          Each of our six uniquely designed rooms blends heritage elegance with modern comfort,
          crafted to offer you a truly memorable stay at Dhanora Dynasty.
        </p>

        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((r) => (
            <article
              key={r.no}
              className="group glass-card overflow-hidden rounded-none hover:-translate-y-1 hover:glass-card-hover"
            >
              <div className="relative h-72 overflow-hidden bg-charcoal">
                <img
                  src={photos(r.no)[0]}
                  alt={r.name}
                  width={1000}
                  height={700}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* One solid bar across the top: room number on the left, tag on the right. */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 border-b border-accent/40 bg-primary-dark/95 px-4 py-2.5">
                  <span className="flex items-baseline gap-1.5 text-accent">
                    <span className="text-[0.65rem] font-medium tracking-[0.18em] uppercase opacity-80">
                      Room
                    </span>
                    <span className="font-serif text-xl leading-none tabular-nums">{r.no}</span>
                  </span>
                  <span className="text-[0.7rem] font-medium tracking-[0.12em] text-ivory uppercase">
                    {r.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-primary mb-1.5">{r.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                  {r.desc}
                </p>

                <div className="mt-3 flex items-baseline gap-2 border-t border-border pt-3">
                  <span className="font-serif text-lg text-primary tabular-nums">{lkr(r.price)}</span>
                  <span className="text-sm text-muted-foreground">/ night</span>
                  <span className="ml-auto font-serif text-lg text-primary tabular-nums">≈ {usd(r.price)}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs text-primary">
                    <BedDouble className="size-3.5 text-accent" /> {r.beds}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs text-primary">
                    <Eye className="size-3.5 text-accent" /> {r.view}
                  </span>
                </div>
                <button
                  onClick={() => setActive(r)}
                  className="mt-4 w-full rounded-full border border-primary px-5 py-2 text-sm text-primary hover:bg-primary hover:text-ivory transition-colors"
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
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        {/* Gradient scrim rather than a flat wash — keeps the photo readable underneath
            while holding AA contrast for the ivory copy. */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/80 via-charcoal/70 to-charcoal-deep/85" />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-ivory">
          <p className="eyebrow mb-4">Reserve Your Stay</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-5">Ready to Experience Royalty?</h2>
          <p className="text-ivory/80 text-lg">
            Contact us to check availability and reserve your room today.
          </p>
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
          className="fixed inset-0 z-[60] bg-charcoal-deep/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface rounded-none overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-charcoal/70 text-ivory backdrop-blur-sm transition-colors hover:bg-accent hover:text-charcoal"
            >
              <X className="size-5" />
            </button>
            {/* key resets the carousel to photo 1 when a different room is opened */}
            <div className="shrink-0 md:w-1/2">
              <RoomCarousel key={active.no} room={active} />
            </div>
            <div className="overflow-y-auto p-8 md:w-1/2">
              <p className="eyebrow mb-2">
                Room {active.no}, {active.tag}
              </p>
              <h3 className="font-serif text-3xl text-primary mb-4">{active.name}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{active.desc}</p>

              <div className="mt-6 flex items-baseline gap-3 rounded-xl bg-primary/5 px-5 py-4">
                <span className="font-serif text-3xl text-primary tabular-nums">
                  {lkr(active.price)}
                </span>
                <span className="text-sm text-muted-foreground">per night</span>
                <span className="ml-auto font-serif text-3xl text-primary tabular-nums">
                  ≈ {usd(active.price)}
                </span>
              </div>

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
