import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Check } from "lucide-react";
import { PageHero } from "../components/site/Section";

const HERO =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dhanora Dynasty Resort" },
      {
        name: "description",
        content: "Contact Dhanora Dynasty Resort in Anuradhapura for inquiries and reservations.",
      },
      { property: "og:title", content: "Contact Dhanora Dynasty Resort" },
      { property: "og:description", content: "Get in touch — we'd love to welcome you." },
      { property: "og:image", content: HERO },
    ],
  }),
  component: Contact,
});

function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84Z" />
    </svg>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = "Please share your name.";
    if (!form.email || !form.email.includes("@")) errs.email = "Valid email required.";
    if (!form.message) errs.message = "Tell us a little about your inquiry.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }
  }

  const input =
    "w-full rounded-xl border border-border bg-surface px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all";

  return (
    <>
      <PageHero title="Contact" subtitle="Contact Us for More Details" image={HERO} />

      <section className="py-20 px-6 bg-background">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="rounded-none bg-surface border border-border p-8 md:p-10 shadow-soft">
            <p className="eyebrow mb-3">Send a Message</p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">Make an Inquiry</h2>

            <form onSubmit={submit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm text-primary mb-2">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={input}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm text-primary mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={input}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-primary mb-2">
                    Contact Number
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={input}
                    placeholder="+94 ..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={input}
                  placeholder="How can we help?"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 font-medium text-ivory hover:bg-primary-dark transition-colors"
              >
                Send Inquire
              </button>
              {sent && (
                <p className="flex items-center gap-2 text-sm text-primary rounded-xl bg-accent/10 border border-accent/40 px-4 py-3">
                  <Check className="size-4 text-accent" /> Thank you, we'll be in touch shortly.
                </p>
              )}
            </form>
          </div>

          {/* Details */}
          <div className="h-full space-y-6">
            <div className="flex h-full flex-col rounded-none bg-primary text-ivory p-10 shadow-elegant">
              <p className="eyebrow mb-3">Get in Touch</p>
              <h2 className="font-serif text-3xl mb-8">Our Details</h2>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-primary-dark shrink-0">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent mb-1">Address</p>
                    <p className="text-ivory/85 leading-relaxed">
                      No 775/3, Bulankulama Disa Mawatha, Stage-11, Anuradhapura, Sri Lanka.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-primary-dark shrink-0">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent mb-1">Phone</p>
                    <p className="text-ivory/85">+94 76 972 5255</p>
                    <p className="text-ivory/85">+94 25 222 7274</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-primary-dark shrink-0">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent mb-1">Email</p>
                    <a
                      href="mailto:dhanoradynastyresort@gmail.com"
                      className="text-ivory/85 hover:text-accent"
                    >
                      dhanoradynastyresort@gmail.com
                    </a>
                  </div>
                </li>
              </ul>

              <a
                href="https://wa.me/94769725255"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-primary-dark font-medium hover:bg-accent-soft transition-colors"
              >
                Chat on WhatsApp
              </a>

              <div className="mt-8 flex gap-3 pt-8 border-t border-accent/20">
                {[
                  {
                    href: "https://www.facebook.com/dhanoradynastyresortanuradhapura",
                    Icon: Facebook,
                    label: "Facebook",
                  },
                  {
                    href: "https://www.instagram.com/dhanora_dynasty_resort",
                    Icon: Instagram,
                    label: "Instagram",
                  },
                  {
                    href: "https://www.tiktok.com/@dhanora_dynasty_resort",
                    Icon: TikTok,
                    label: "TikTok",
                  },
                  {
                    href: "https://www.youtube.com/@DhanoraDynastyResort",
                    Icon: Youtube,
                    label: "YouTube",
                  },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-primary-dark transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map — the resort's actual Google Maps place embed */}
      <section className="w-full">
        <iframe
          title="Dhanora Dynasty Resort location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.8698148716066!2d80.40362567501067!3d8.315733491719875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5c8314fc9b1%3A0xeb0d347f29cbba9e!2sDhanora%20Dynasty%20Resort!5e0!3m2!1sen!2slk!4v1783939132332!5m2!1sen!2slk"
          className="block w-full h-[420px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>
    </>
  );
}
