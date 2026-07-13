import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84Z" />
    </svg>
  );
}

const socials = [
  {
    href: "https://www.facebook.com/dhanoradynastyresortanuradhapura",
    label: "Facebook",
    Icon: Facebook,
  },
  { href: "https://www.instagram.com/dhanora_dynasty_resort", label: "Instagram", Icon: Instagram },
  { href: "https://www.tiktok.com/@dhanora_dynasty_resort", label: "TikTok", Icon: TikTok },
  { href: "https://www.youtube.com/@DhanoraDynastyResort", label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        <div>
          <div className="mb-5">
            <img src="/images/logo.png" alt="Dhanora Dynasty Resort" className="h-14 w-auto" />
          </div>
          <p className="text-ivory/70 leading-relaxed max-w-sm">
            Experience luxury and royalty like never before in our exquisite resort.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Quick Links</h4>
          <ul className="space-y-3 text-ivory/80">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/menu", label: "Menu" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
              { to: "/credits", label: "Image Credits" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Contact Info</h4>
          <ul className="space-y-4 text-ivory/80">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-accent" />
              <span>No 775/3, Bulankulama Disa Mawatha, Stage-11, Anuradhapura, Sri Lanka.</span>
            </li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0 text-accent" />
              <span>+94 76 972 5255 / +94 25 222 7274</span>
            </li>
            <li className="flex gap-3">
              <Mail className="size-5 shrink-0 text-accent" />
              <a href="mailto:dhanoradynastyresort@gmail.com" className="hover:text-accent">
                dhanoradynastyresort@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-accent/20 bg-charcoal-deep">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-ivory/60">
          © 2025 Dhanora Dynasty Resort. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
