import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "../components/site/Section";

const HERO = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1920&q=80";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Dhanora Dynasty Resort" },
      { name: "description", content: "Our vision, mission, and the story behind Dhanora Dynasty Resort in Anuradhapura." },
      { property: "og:title", content: "About Dhanora Dynasty Resort" },
      { property: "og:description", content: "Heritage hospitality in the heart of Rajarata." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="About Us" subtitle="Welcome to Dhanora Dynasty" image={HERO} />

      {/* Vision & Mission */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Our Vision",
              body:
                "To be the crown jewel of hospitality where blending heritage and modern luxury to create a haven of serenity and unforgettable experiences.",
            },
            {
              title: "Our Mission",
              body:
                "To provide every guest with a service-driven journey of comfort and care by offering luxurious accommodation, tranquil atmosphere, cultural heritage, authentic flavors and maintaining hygiene standards that feel like home.",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-none border border-accent/30 bg-surface p-10 shadow-soft"
            >
              <span className="hairline" />
              <h2 className="mt-4 font-serif text-3xl text-primary">{c.title}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-lg">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Owner's Message */}
      <section className="py-24 px-6 bg-surface">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[420px_1fr] gap-14 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Kelum Senanayaka, Founder & Managing Director"
              className="rounded-none object-cover w-full h-[520px] shadow-elegant"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block rounded-none bg-primary text-ivory px-6 py-4 border border-accent/40">
              <p className="font-serif text-xl">Kelum Senanayaka</p>
              <p className="text-xs text-accent uppercase tracking-widest">Founder & Managing Director</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3">Owner's Message</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8">A Word From Our Founder</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Welcome to Dhanora Dynasty Resort, where timeless tranquility meets warm Sri Lankan
                hospitality. Nestled in the heart of the historic city of Anuradhapura, our resort was
                created with a vision to offer guests a peaceful escape while embracing the rich cultural
                heritage of Rajarata.
              </p>
              <p>
                Every corner of Dhanora Dynasty Resort reflects our commitment to comfort, elegance, and
                authentic experiences. We take great pride in providing a relaxing environment complemented
                by modern amenities, delicious cuisine, and a dedicated team ready to serve you with
                genuine care and friendliness.
              </p>
              <p>
                Thank you for choosing Dhanora Dynasty Resort. We look forward to welcoming you and
                creating unforgettable moments during your stay.
              </p>
            </div>
            <div className="mt-8 border-t border-accent/30 pt-6">
              <p className="font-serif italic text-2xl text-primary">Warm Regards,</p>
              <p className="text-muted-foreground">Dhanora Dynasty Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage strip */}
      <section className="py-24 px-6 bg-background">
        <SectionHeader
          eyebrow="Our Heritage"
          title="Where Rajarata's Past Meets Refined Hospitality"
          description="Inspired by the dynasties that shaped Sri Lanka's golden age, our resort weaves heritage motifs, lakeside calm, and modern luxury into every moment."
        />
        <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1610552050890-fe99536c2615?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="rounded-none object-cover h-56 w-full" />
          ))}
        </div>
      </section>
    </>
  );
}
