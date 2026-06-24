import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Crown,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  ConciergeBell,
  Check,
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "../components/site/Section";

const HERO = "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80";

const amenities = [
  { Icon: Crown, title: "Royal Suites", desc: "Experience royal comfort in our elegantly designed suites with panoramic views and premium amenities." },
  { Icon: Sparkles, title: "Ayurvedic Wellness", desc: "Indulge in rejuvenating treatments inspired by ancient wellness traditions in our world-class spa." },
  { Icon: UtensilsCrossed, title: "Fine Dining", desc: "Savor exquisite cuisines prepared by master chefs in our signature restaurants." },
  { Icon: Waves, title: "Infinity Pool", desc: "Relax in our stunning infinity pool with breathtaking views of the surrounding landscape." },
  { Icon: Dumbbell, title: "Fitness Center", desc: "Maintain your wellness routine in our state-of-the-art fitness facility." },
  { Icon: ConciergeBell, title: "Concierge", desc: "Our dedicated staff ensures every need is met with royal attention to detail." },
];

const experiences = [
  { title: "Elite Fitness Center", desc: "Stay energized with modern equipment and a refined workout environment designed for comfort and performance.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80" },
  { title: "Infinity Pool", desc: "Relax in a stunning infinity pool with scenic surroundings and a calm, luxurious atmosphere.", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80" },
  { title: "Smart Kitchen & Dining", desc: "Experience refined cuisine prepared with innovation, quality ingredients, and exceptional service.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" },
];

const roomsPreview = [
  { name: "VIP Family Room", tag: "Room 102", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80" },
  { name: "Luxury Single", tag: "Room 103", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" },
  { name: "Entertaining Suite", tag: "Room 105", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80" },
  { name: "Deluxe Family Room", tag: "Room 106", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80" },
];

const menuPreview = [
  { cat: "Appetizer", name: "Spring Rolls", desc: "Crispy golden rolls with fresh vegetables." },
  { cat: "Soup", name: "French Onion Soup", desc: "Caramelized onions, melted cheese, croutons." },
  { cat: "Main Course", name: "Grilled Salmon", desc: "Atlantic salmon with lemon butter sauce." },
  { cat: "Dessert", name: "Chocolate Lava Cake", desc: "Warm chocolate with vanilla ice cream." },
  { cat: "Drinks", name: "Specialty Coffee", desc: "Cappuccino, Latte, Espresso, or Mocha." },
  { cat: "Appetizer", name: "Bruschetta", desc: "Toasted bread, tomatoes, basil, olive oil." },
];

const attractions = [
  { name: "Jaya Sri Maha Bodhi", desc: "The sacred Bodhi tree, a revered Buddhist pilgrimage site.", img: "https://images.unsplash.com/photo-1567604130959-7ea7ab2a7f5d?auto=format&fit=crop&w=1200&q=80" },
  { name: "Ruwanwelisaya", desc: "A majestic ancient stupa from the Anuradhapura Kingdom.", img: "https://images.unsplash.com/photo-1610552050890-fe99536c2615?auto=format&fit=crop&w=1200&q=80" },
  { name: "Kubichchankulama Lake", desc: "Serene lakeside views just steps from the resort.", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" },
  { name: "Wilpattu Safaris", desc: "Wildlife adventures in Sri Lanka's largest national park.", img: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhanora Dynasty Resort — Luxury Heritage in Anuradhapura" },
      { name: "description", content: "Experience the timeless tranquility of Rajarata ancient kingdom at Dhanora Dynasty Resort." },
      { property: "og:title", content: "Dhanora Dynasty Resort" },
      { property: "og:description", content: "Luxury heritage resort in Anuradhapura, Sri Lanka." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Home,
});

function Home() {
  const [menuFilter, setMenuFilter] = useState<string>("All");
  const cats = ["All", "Appetizer", "Soup", "Main Course", "Dessert", "Drinks"];
  const visible = menuFilter === "All" ? menuPreview : menuPreview.filter((m) => m.cat === menuFilter);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <img src={HERO} alt="Dhanora Dynasty Resort exterior" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary/55 to-primary-dark/90" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center text-ivory">
          <p className="eyebrow mb-5 animate-fade-up">Welcome to Anuradhapura</p>
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] animate-fade-up">
            Dhanora <span className="text-accent">Dynasty</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-ivory/85 animate-fade-up">
            Experience the timeless tranquility of Rajarata ancient kingdom.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up">
            <a
              href="https://wa.me/94769725255"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-8 py-3.5 font-medium text-primary-dark hover:bg-accent-soft transition-colors"
            >
              Inquire Now
            </a>
            <Link
              to="/rooms"
              className="rounded-full border border-ivory/40 px-8 py-3.5 font-medium text-ivory hover:bg-ivory/10 transition-colors"
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
          <div>
            <p className="eyebrow mb-3">A Royal Retreat</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">
              A Sanctuary in the Sacred City
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Nestled in the heart of the ancient city of Anuradhapura, Dhanora Dynasty Resort invites
              you to experience a perfect harmony of luxury, tranquility, and cultural charm. Surrounded
              by the timeless beauty of Sri Lanka's historic kingdom, the resort enjoys an ideal location
              near the serene Kubichchankulama Lake — just 2 km from the sacred city and its iconic
              landmarks such as the revered Jaya Sri Maha Bodhi and the majestic Ruwanwelisaya.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "2 km", l: "To Sacred City" },
                { v: "6", l: "Unique Rooms" },
                { v: "Lakeside", l: "Location" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-accent/30 bg-surface p-5 text-center">
                  <div className="font-serif text-2xl text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80" alt="" className="rounded-2xl object-cover h-72 w-full row-span-2" />
            <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80" alt="" className="rounded-2xl object-cover h-44 w-full" />
            <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80" alt="" className="rounded-2xl object-cover h-44 w-full" />
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24 px-6 bg-surface">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Our Amenities"
            title="Crafted for Royal Comfort"
            description="Every detail considered, every comfort imagined — a stay that lingers in memory."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-soft hover:border-accent/40"
              >
                <div className="grid size-14 place-items-center rounded-xl bg-primary/5 text-accent mb-5 group-hover:bg-primary group-hover:text-accent transition-colors">
                  <Icon className="size-7" />
                </div>
                <h3 className="font-serif text-2xl text-primary mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
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
              At Dhanora Dynasty, every detail is designed to deliver a refined hospitality experience.
              From luxurious suites and breathtaking surroundings to personalized service and fine dining,
              our hotel blends grandeur with warmth to create truly memorable stays.
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
              <article key={e.title} className="group overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative h-72 overflow-hidden">
                  <img src={e.img} alt={e.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
              <article key={r.tag} className="group overflow-hidden rounded-2xl bg-surface border border-border">
                <div className="relative h-64 overflow-hidden">
                  <img src={r.img} alt={r.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute top-3 left-3 rounded-full bg-primary-dark/80 px-3 py-1 text-xs text-accent">
                    {r.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-primary">{r.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Heritage elegance, modern comfort.</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/rooms" className="rounded-full bg-primary px-8 py-3.5 text-ivory hover:bg-primary-dark transition-colors">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-24 px-6 bg-surface">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="From Our Kitchen" title="Savor the Taste of Tradition" />
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cats.map((c) => (
              <button
                key={c}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((m) => (
              <article key={m.name} className="rounded-2xl border border-border bg-surface p-7 hover:border-accent/50 transition-colors">
                <p className="eyebrow mb-2">{m.cat}</p>
                <h3 className="font-serif text-xl text-primary mb-2">{m.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/menu" className="rounded-full border border-primary px-8 py-3.5 text-primary hover:bg-primary hover:text-ivory transition-colors">
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
              <article key={a.name} className="group overflow-hidden rounded-2xl bg-surface border border-border">
                <div className="relative h-56 overflow-hidden">
                  <img src={a.img} alt={a.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            Discover the perfect blend of luxury, comfort, and hospitality at Dhanora Dynasty Resort.
            Let us create unforgettable memories for you.
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
