import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { CATEGORY_IMAGE, MENU_CATEGORIES, menuByGroup, slug, type MenuCategory } from "../lib/menu";
import {
  Crown,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  ConciergeBell,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "../components/site/Section";

const HERO =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80";

const amenities = [
  {
    Icon: Crown,
    title: "Royal Suites",
    desc: "Experience royal comfort in our elegantly designed suites with panoramic views and premium amenities.",
    img: "/images/amenities/royal-suites.webp",
  },
  {
    Icon: Sparkles,
    title: "Ayurvedic Wellness",
    desc: "Indulge in rejuvenating treatments inspired by ancient wellness traditions in our world-class spa.",
    img: "/images/amenities/ayurvedic-wellness.jpg",
  },
  {
    Icon: UtensilsCrossed,
    title: "Fine Dining",
    desc: "Savor exquisite cuisines prepared by master chefs in our signature restaurants.",
    img: "/images/amenities/fine-dining.jpg",
  },
  {
    Icon: Waves,
    title: "Infinity Pool",
    desc: "Relax in our stunning infinity pool with breathtaking views of the surrounding landscape.",
    img: "/images/amenities/infinity-pool.jpg",
  },
  {
    Icon: Dumbbell,
    title: "Fitness Center",
    desc: "Maintain your wellness routine in our state-of-the-art fitness facility.",
    img: "/images/amenities/fitness-center.avif",
  },
  {
    Icon: ConciergeBell,
    title: "Concierge",
    desc: "Our dedicated staff ensures every need is met with royal attention to detail.",
    img: "/images/amenities/concierge.avif",
  },
];

function AmenityCard({
  Icon,
  title,
  desc,
  img,
  index,
}: {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  img: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 110}ms` }}
      className={`group flex flex-row overflow-hidden rounded-3xl border border-white/50 bg-surface/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_-15px_rgba(26,26,26,0.25)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/50 hover:shadow-[0_22px_55px_-18px_rgba(26,26,26,0.4)] sm:flex-col ${
        shown ? "translate-y-0 opacity-100 hover:-translate-y-1.5" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative w-2/5 shrink-0 overflow-hidden sm:h-44 sm:w-full">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 grid size-10 place-items-center rounded-xl border border-white/30 bg-white/15 text-ivory backdrop-blur-md">
          <Icon className="size-5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 sm:justify-start">
        <h3 className="font-serif text-xl text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        <Link
          to="/gallery"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-primary sm:mt-auto sm:pt-4"
        >
          View in Gallery
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

const experiences = [
  {
    title: "Elite Fitness Center",
    desc: "Stay energized with modern equipment and a refined workout environment designed for comfort and performance.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Infinity Pool",
    desc: "Relax in a stunning infinity pool with scenic surroundings and a calm, luxurious atmosphere.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Smart Kitchen & Dining",
    desc: "Experience refined cuisine prepared with innovation, quality ingredients, and exceptional service.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
  },
];

const roomsPreview = [
  {
    name: "VIP Family Room",
    tag: "Room 102",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Luxury Single",
    tag: "Room 103",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Entertaining Suite",
    tag: "Room 105",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Deluxe Family Room",
    tag: "Room 106",
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
  },
];

const attractions = [
  {
    name: "Jaya Sri Maha Bodhi",
    desc: "The sacred Bodhi tree, a revered Buddhist pilgrimage site.",
    img: "https://images.unsplash.com/photo-1567604130959-7ea7ab2a7f5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ruwanwelisaya",
    desc: "A majestic ancient stupa from the Anuradhapura Kingdom.",
    img: "https://images.unsplash.com/photo-1610552050890-fe99536c2615?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kubichchankulama Lake",
    desc: "Serene lakeside views just steps from the resort.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Wilpattu Safaris",
    desc: "Wildlife adventures in Sri Lanka's largest national park.",
    img: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhanora Dynasty Resort — Luxury Heritage in Anuradhapura" },
      {
        name: "description",
        content:
          "Experience the timeless tranquility of Rajarata ancient kingdom at Dhanora Dynasty Resort.",
      },
      { property: "og:title", content: "Dhanora Dynasty Resort" },
      { property: "og:description", content: "Luxury heritage resort in Anuradhapura, Sri Lanka." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Home,
});

function Home() {
  const [menuFilter, setMenuFilter] = useState<MenuCategory>(MENU_CATEGORIES[0]);

  // Hero title typing animation — runs once on the client, types the whole phrase as one unit.
  const heroTitle = "Dhanora Dynasty";
  const goldFrom = 8; // index where "Dynasty" starts ("Dhanora " = 8 chars)
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= heroTitle.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center text-ivory">
          <p className="eyebrow mb-5 animate-fade-up !text-[0.6rem] sm:!text-[0.7rem] tracking-[0.2em]">
            Welcome to Anuradhapura
          </p>
          <h1 className="font-serif text-[clamp(2rem,10.5vw,7rem)] leading-[1.05] md:leading-[0.95] min-h-[1.1em] whitespace-nowrap">
            <span className="sr-only">Dhanora Dynasty</span>
            <span aria-hidden="true">
              <span className="inline-block">
                {"Dhanora".split("").map((ch, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-all duration-500 ease-out ${
                      i < typed
                        ? "opacity-100 blur-0 translate-y-0"
                        : "opacity-0 blur-[3px] translate-y-1"
                    }`}
                  >
                    {ch}
                  </span>
                ))}
              </span>{" "}
              <span className="inline-block text-accent">
                {"Dynasty".split("").map((ch, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-all duration-500 ease-out ${
                      goldFrom + i < typed
                        ? "opacity-100 blur-0 translate-y-0"
                        : "opacity-0 blur-[3px] translate-y-1"
                    }`}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-xl text-ivory/85 animate-fade-up">
            Experience the timeless tranquility of Rajarata ancient kingdom.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up">
            <a
              href="https://www.booking.com/hotel/lk/dhanora-dynasty-resort.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-8 py-3.5 font-medium text-primary-dark hover:bg-accent-soft transition-colors"
            >
              Book Now
            </a>
            <Link
              to="/rooms"
              className="rounded-full border border-ivory/25 bg-gradient-to-b from-ivory/15 via-primary-dark/35 to-primary-dark/35 px-8 py-3.5 font-medium text-ivory backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_30px_-10px_rgba(0,0,0,0.45)] transition-all hover:border-ivory/40 hover:from-ivory/25 hover:-translate-y-0.5"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/70">
          <ChevronDown className="size-7 animate-bounce" />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="eyebrow mb-3">A Royal Retreat</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary mb-5">
              A Sanctuary in the Sacred City
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Nestled in ancient Anuradhapura beside the serene Kubichchankulama Lake, Dhanora
              Dynasty Resort blends luxury and timeless heritage — just 2 km from the sacred city
              and its revered landmarks.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { v: "2 km", l: "To Sacred City" },
                { v: "6", l: "Unique Rooms" },
                { v: "Lakeside", l: "Location" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-accent/30 bg-surface px-2 py-4 sm:p-5 text-center"
                >
                  <div className="font-serif text-lg sm:text-2xl text-primary leading-tight">
                    {s.v}
                  </div>
                  <div className="text-[0.7rem] sm:text-xs text-muted-foreground mt-1 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="rounded-2xl object-cover h-full w-full row-span-2"
            />
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="rounded-2xl object-cover h-44 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="rounded-2xl object-cover h-44 w-full"
            />
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-secondary via-background to-accent-soft/40">
        <span className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <span className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Our Amenities"
            title="Crafted for Royal Comfort"
            description="Every detail considered, every comfort imagined — a stay that lingers in memory."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {amenities.map((a, i) => (
              <AmenityCard key={a.title} {...a} index={i} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm text-primary">
              <Sparkles className="size-4 text-accent" /> 24/7 Royal Service
            </span>
          </div>
        </div>
      </section>

      {/* WELCOME / WHY US */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="rounded-3xl object-cover h-[520px] w-full shadow-soft"
          />
          <div>
            <p className="eyebrow mb-3">Welcome to Dhanora Dynasty</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              A Royal Escape Crafted With Elegance, Comfort, and Timeless Charm
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              At Dhanora Dynasty, every detail is designed to deliver a refined hospitality
              experience. From luxurious suites and breathtaking surroundings to personalized
              service and fine dining, our hotel blends grandeur with warmth to create truly
              memorable stays.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                "Luxury Rooms",
                "Signature Dining Experience",
                "Scenic Relaxation Spaces",
                "Warm Personalized Service",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary">
                  <span className="grid size-7 place-items-center rounded-full bg-accent text-primary-dark">
                    <Check className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="py-24 px-6 bg-surface">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Our Experiences" title="Signature Luxury Moments" />
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((e) => (
              <article
                key={e.title}
                className="group overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl text-primary mb-3">{e.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Stay With Us" title="Rooms Fit for Royalty" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomsPreview.map((r) => (
              <article
                key={r.tag}
                className="group overflow-hidden rounded-2xl bg-surface border border-border"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-primary-dark/80 px-3 py-1 text-xs text-accent">
                    {r.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-primary">{r.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Heritage elegance, modern comfort.
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/rooms"
              className="rounded-full bg-primary px-8 py-3.5 text-ivory hover:bg-primary-dark transition-colors"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-24 px-6 bg-surface">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="From Our Kitchen" title="Savor the Taste of Tradition" />

          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap justify-center gap-2 mb-14"
          >
            {MENU_CATEGORIES.map((c) => (
              <button
                key={c}
                id={`menu-tab-${slug(c)}`}
                role="tab"
                aria-selected={menuFilter === c}
                aria-controls={`menu-panel-${slug(c)}`}
                onClick={() => setMenuFilter(c)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  menuFilter === c
                    ? "bg-primary text-ivory border-primary"
                    : "border-border text-muted-foreground hover:border-accent hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Every category is rendered server-side and inactive ones are hidden, so the whole
              menu is crawlable — not just the tab that happens to be open. */}
          <div className="mx-auto max-w-5xl">
            {MENU_CATEGORIES.map((cat) => (
              <div
                key={cat}
                id={`menu-panel-${slug(cat)}`}
                role="tabpanel"
                aria-labelledby={`menu-tab-${slug(cat)}`}
                hidden={menuFilter !== cat}
              >
                <h3 className="sr-only">{cat}</h3>
                {/* Lazy so the ten hidden panels don't download their banners up front. */}
                <div className="mb-12 overflow-hidden rounded-3xl">
                  <img
                    src={CATEGORY_IMAGE[cat].src}
                    alt={CATEGORY_IMAGE[cat].alt}
                    width={1200}
                    height={520}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover md:h-72"
                  />
                </div>
                {menuByGroup(cat).map((g) => (
                  <div key={g.group ?? cat} className="mb-12 last:mb-0">
                    {g.group && (
                      <div className="mb-7 flex items-center gap-4">
                        <p className="eyebrow whitespace-nowrap">{g.group}</p>
                        <span className="h-px flex-1 bg-accent/30" />
                      </div>
                    )}
                    <ul className="grid gap-x-14 gap-y-7 md:grid-cols-2">
                      {g.items.map((m) => (
                        <li
                          key={`${m.category}-${m.name}`}
                          className="border-b border-border/60 pb-5"
                        >
                          <h4 className="font-serif text-lg text-primary">{m.name}</h4>
                          {m.description && (
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                              {m.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/menu"
              className="rounded-full border border-primary px-8 py-3.5 text-primary hover:bg-primary hover:text-ivory transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* NEARBY */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Explore"
            title="Discover the Ancient Kingdom"
            description="Step beyond the resort and into 2,000 years of Sri Lankan heritage."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((a) => (
              <article
                key={a.name}
                className="group overflow-hidden rounded-2xl bg-surface border border-border"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.name}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-primary">{a.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden py-28 px-6">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-ivory">
          <p className="eyebrow mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Begin Your Royal Journey</h2>
          <p className="text-ivory/85 text-lg leading-relaxed">
            Discover the perfect blend of luxury, comfort, and hospitality at Dhanora Dynasty
            Resort. Let us create unforgettable memories for you.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="rounded-full bg-accent px-9 py-4 font-medium text-primary-dark hover:bg-accent-soft transition-colors"
            >
              Make an Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
