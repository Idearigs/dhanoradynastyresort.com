import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  CATEGORY_IMAGE,
  MENU_CATEGORIES,
  dishImage,
  menuByGroup,
  slug,
  type MenuCategory,
} from "../lib/menu";
import {
  Crown,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  ConciergeBell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  X,
} from "lucide-react";
import { SectionHeader } from "../components/site/Section";
import { Reveal } from "../components/site/Reveal";
import { BookNow } from "../components/site/BookNow";
import { ATTRACTIONS, type Attraction } from "../lib/attractions";

const HERO =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80";

const amenities = [
  {
    Icon: Crown,
    title: "Royal Suites",
    desc: "Experience royal comfort in our elegantly designed suites with panoramic views and premium amenities.",
    img: "/images/rooms/102-1.webp",
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
    img: "/images/amenities/infinity-pool.webp",
  },
  {
    Icon: Dumbbell,
    title: "Fitness Center",
    desc: "Maintain your wellness routine in our state-of-the-art fitness facility.",
    img: "/images/amenities/fitness-center.webp",
  },
  {
    Icon: ConciergeBell,
    title: "Concierge",
    desc: "Our dedicated staff ensures every need is met with royal attention to detail.",
    img: "/images/amenities/concierge.avif",
  },
];

/** Carousel for the attraction dialog. Shows arrows/dots only when there is more than one image. */
function AttractionGallery({ attraction }: { attraction: Attraction }) {
  const images = [attraction.image, ...(attraction.gallery ?? [])];
  const [i, setI] = useState(0);
  const go = (step: number) => setI((n) => (n + step + images.length) % images.length);

  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className="relative h-56 overflow-hidden bg-charcoal sm:h-64 md:h-full md:min-h-[24rem]">
      {images.map((src, n) => (
        <img
          key={src}
          src={src}
          alt={`${attraction.name}, photo ${n + 1} of ${images.length}`}
          width={1000}
          height={700}
          loading={n === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
            n === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute top-1/2 left-4 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-accent/30 bg-charcoal/60 text-ivory backdrop-blur-sm transition-colors hover:bg-accent hover:text-charcoal"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute top-1/2 right-4 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-accent/30 bg-charcoal/60 text-ivory backdrop-blur-sm transition-colors hover:bg-accent hover:text-charcoal"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((src, n) => (
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
            {i + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}

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
      className={`group flex flex-row overflow-hidden rounded-none border border-white/50 bg-surface/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_-15px_rgba(26,26,26,0.25)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/50 hover:shadow-[0_22px_55px_-18px_rgba(26,26,26,0.4)] sm:flex-col ${
        shown ? "translate-y-0 opacity-100 hover:-translate-y-1.5" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative w-2/5 shrink-0 overflow-hidden sm:aspect-[3/2] sm:h-auto sm:w-full">
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
    img: "/images/amenities/fitness-center.webp",
  },
  {
    title: "Infinity Pool",
    desc: "Relax in a stunning infinity pool with scenic surroundings and a calm, luxurious atmosphere.",
    img: "/images/amenities/infinity-pool.webp",
  },
  {
    title: "Smart Kitchen & Dining",
    desc: "Experience refined cuisine prepared with innovation, quality ingredients, and exceptional service.",
    img: "/images/amenities/smart-kitchen-dining.webp",
  },
];

const roomsPreview = [
  {
    name: "VIP Family Room",
    tag: "Room 102",
    img: "/images/rooms/102-1.webp",
  },
  {
    name: "Luxury Single",
    tag: "Room 103",
    img: "/images/rooms/103-1.webp",
  },
  {
    name: "Entertaining Suite",
    tag: "Room 105",
    img: "/images/rooms/105-1.webp",
  },
  {
    name: "Deluxe Family Room",
    tag: "Room 106",
    img: "/images/rooms/106-1.webp",
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
  const [attraction, setAttraction] = useState<Attraction | null>(null);

  useEffect(() => {
    if (!attraction) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAttraction(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [attraction]);

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
            <BookNow
              align="center"
              className="rounded-full bg-accent px-8 py-3.5 font-medium text-primary-dark transition-colors hover:bg-accent-soft"
            />
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
              Dynasty Resort blends luxury and timeless heritage, just 2 km from the sacred city
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
                  className="rounded-none border border-accent/30 bg-surface px-2 py-4 sm:p-5 text-center"
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
          {/* Right images keep their true 8:5 aspect (no crop); the left image spans
              both rows and fills the combined height — its slot ends up ~3:4, matching
              the pavilion photo, so nothing is stretched or awkwardly cropped. */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/home/intro-villa.webp"
              alt="The white villa of Dhanora Dynasty Resort with its swimming pool and flowering garden"
              width={760}
              height={1013}
              loading="lazy"
              decoding="async"
              className="rounded-none object-cover h-full w-full row-span-2"
            />
            <img
              src="/images/home/intro-terrace.webp"
              alt="Top-down view of the resort's pool, terrace and landscaped gardens"
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="rounded-none object-cover aspect-[8/5] w-full"
            />
            <img
              src="/images/home/intro-pavilion.webp"
              alt="Garden dining pavilion with a tiled roof, framed by coconut palms at Dhanora Dynasty Resort"
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="rounded-none object-cover aspect-[8/5] w-full"
            />
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="relative overflow-hidden bg-surface py-24 px-6">
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Our Amenities"
            title="Crafted for Royal Comfort"
            description="Every detail considered, every comfort imagined, a stay that lingers in memory."
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
            src="/images/home/welcome.webp"
            alt="Entertaining Suite interior at Dhanora Dynasty Resort"
            className="rounded-none object-cover h-[520px] w-full shadow-soft"
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
            {experiences.map((e, i) => (
              <Reveal key={e.title} delay={i * 90} className="h-full">
                <article className="group glass-card flex h-full flex-col overflow-hidden rounded-none hover:-translate-y-1 hover:glass-card-hover">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={e.img}
                      alt={e.title}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-serif text-xl text-primary">{e.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Stay With Us" title="Rooms Fit for Royalty" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomsPreview.map((r, i) => (
              <Reveal key={r.tag} delay={i * 90}>
                <article className="group glass-card overflow-hidden rounded-none hover:-translate-y-1 hover:glass-card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Same solid bar as the rooms page, so the number reads clearly. */}
                    <div className="absolute inset-x-0 top-0 flex items-baseline gap-1.5 border-b border-accent/40 bg-primary-dark/95 px-4 py-2.5 text-accent">
                      <span className="text-[0.65rem] font-medium tracking-[0.18em] uppercase opacity-80">
                        Room
                      </span>
                      <span className="font-serif text-xl leading-none tabular-nums">
                        {r.tag.replace(/^Room\s*/, "")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-primary">{r.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Heritage elegance, modern comfort.
                    </p>
                  </div>
                </article>
              </Reveal>
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
                <div className="mb-12 overflow-hidden rounded-none">
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
                {/* Home is a teaser — first three dishes per sub-group; the full menu lives on /menu. */}
                {menuByGroup(cat).map((g) => (
                  <div key={g.group ?? cat} className="mb-12 last:mb-0">
                    {g.group && (
                      <div className="mb-7 flex items-center gap-4">
                        <p className="eyebrow whitespace-nowrap">{g.group}</p>
                        <span className="h-px flex-1 bg-accent/30" />
                      </div>
                    )}
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {g.items.slice(0, 3).map((m) => (
                        <li
                          key={`${m.category}-${m.name}`}
                          className="group glass-card overflow-hidden rounded-none hover:-translate-y-1 hover:border-accent/50 hover:glass-card-hover"
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
                            <h4 className="font-serif text-lg text-primary">{m.name}</h4>
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
            description="Step beyond the resort and into 2,000 years of Sri Lankan heritage, and the wild landscapes that surround it."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ATTRACTIONS.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 4) * 90} className="h-full">
                <article className="group glass-card flex h-full flex-col overflow-hidden rounded-none hover:-translate-y-1 hover:border-accent/50 hover:glass-card-hover">
                <div className="relative aspect-[10/7] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.alt}
                    width={1000}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs text-ivory backdrop-blur-sm">
                    {a.meta}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg text-primary">{a.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.tagline}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAttraction(a)}
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent transition-colors hover:text-primary"
                  >
                    More Details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA — full-width band; the wide collage sizes the section (no crop). */}
      <section className="relative overflow-hidden">
        <img
          src="/images/home/highlights.webp"
          alt="A glimpse of Dhanora Dynasty Resort — villa and pool, suites, rooftop terrace, garden pavilion, fitness centre and lounge spaces"
          width={1997}
          height={788}
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
        {/* Layered scrim — a base wash plus a centre-weighted radial darkening so the copy
            stays crisp while the collage still reads at the edges. */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-charcoal/55 to-charcoal-deep/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,10,9,0.72)_0%,rgba(13,10,9,0.35)_45%,transparent_75%)]" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-ivory [text-shadow:0_2px_16px_rgba(0,0,0,0.65)]">
          <p className="eyebrow mb-2 sm:mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-5">
            Begin Your Royal Journey
          </h2>
          <p className="hidden max-w-2xl text-ivory/90 leading-relaxed sm:block sm:text-lg">
            Discover the perfect blend of luxury, comfort, and hospitality at Dhanora Dynasty
            Resort. Let us create unforgettable memories for you.
          </p>
          <div className="mt-4 sm:mt-9">
            <Link
              to="/contact"
              className="rounded-full bg-accent px-6 py-3 font-medium text-charcoal transition-colors hover:bg-accent-soft sm:px-9 sm:py-4"
            >
              Make an Inquiry
            </Link>
          </div>
        </div>
      </section>

      {attraction && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal-deep/85 p-4 backdrop-blur-sm"
          onClick={() => setAttraction(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attraction-title"
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-none bg-surface shadow-elegant md:flex-row"
          >
            <button
              type="button"
              onClick={() => setAttraction(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-charcoal/70 text-ivory backdrop-blur-sm transition-colors hover:bg-accent hover:text-charcoal"
            >
              <X className="size-5" />
            </button>

            <div className="shrink-0 md:w-1/2">
              <AttractionGallery key={attraction.slug} attraction={attraction} />
            </div>

            <div className="overflow-y-auto p-6 md:w-1/2">
              <p className="eyebrow mb-1.5">{attraction.meta}</p>
              <h3 id="attraction-title" className="mb-2.5 font-serif text-2xl text-primary">
                {attraction.name}
              </h3>

              <div className="space-y-2.5">
                {attraction.details.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>

              <dl className="mt-5 grid gap-px overflow-hidden rounded-none border border-border bg-border">
                {attraction.facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 bg-surface px-4 py-2.5"
                  >
                    <dt className="text-xs tracking-widest text-muted-foreground uppercase">
                      {f.label}
                    </dt>
                    <dd className="text-sm font-medium text-primary">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  attraction.mapQuery ?? `${attraction.name}, Anuradhapura, Sri Lanka`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-accent-soft"
              >
                <MapPin className="size-4" />
                View on the map
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
