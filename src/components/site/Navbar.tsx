import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Facebook, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { BookNow } from "./BookNow";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/rooms", label: "Rooms" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.45)] py-3"
            : "bg-gradient-to-b from-black/20 to-transparent backdrop-blur-[2px] py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center text-ivory"
            aria-label="Dhanora Dynasty Resort — home"
          >
            <img
              src="/images/logo.png"
              alt="Dhanora Dynasty Resort"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-11 md:h-12" : "h-12 md:h-14"}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-ivory/90 hover:text-accent transition-colors"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <BookNow className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-primary-dark transition-colors hover:bg-accent-soft" />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-ivory"
            aria-label="Open menu"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm overflow-hidden bg-ivory shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* gold edge */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent" />

        <div className="relative flex h-full flex-col">
          <div className="relative flex items-center justify-between bg-gradient-to-r from-primary-dark to-primary px-7 py-5">
            <img src="/images/logo.png" alt="Dhanora Dynasty Resort" className="h-12 w-auto" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-ivory/20 bg-ivory/5 text-ivory transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" />
            </button>
            {/* gold hairline */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          </div>

          <nav className="flex min-h-0 flex-1 flex-col overflow-hidden px-7 pt-5">
            <p className="eyebrow mb-2 shrink-0">Navigation</p>
            <ul className="flex flex-1 flex-col justify-evenly">
              {links.map((l, i) => (
                <li key={l.to} className="border-b border-primary/10">
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "!text-accent" }}
                    activeOptions={{ exact: l.to === "/" }}
                    style={open ? { animationDelay: `${120 + i * 70}ms` } : undefined}
                    className={`group flex items-center gap-4 py-[clamp(0.35rem,1vh,0.7rem)] text-primary transition-colors hover:text-accent ${
                      open ? "animate-menu-item" : "opacity-0"
                    }`}
                  >
                    <span className="font-sans text-xs text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-serif text-lg leading-none">{l.label}</span>
                    <ArrowUpRight className="size-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-7 pb-[clamp(1.25rem,3vh,2rem)] pt-[clamp(0.75rem,2vh,1.5rem)]">
            {/* Opens upward and fills the drawer width — the button sits at the drawer's
                bottom edge, and the drawer is overflow-hidden. */}
            <BookNow
              up
              fluid
              className="flex w-full items-center justify-center rounded-full bg-accent px-8 py-3 text-center font-medium text-primary-dark shadow-[0_10px_30px_-10px_rgba(201,162,39,0.6)] transition-colors hover:bg-accent-soft"
            />

            <a
              href="tel:+94769725255"
              className="mt-4 flex items-center justify-center gap-2 text-sm text-primary/70 transition-colors hover:text-accent"
            >
              <Phone className="size-4" />
              +94 76 972 5255
            </a>

            <div className="mt-4 flex items-center justify-center gap-3 border-t border-primary/10 pt-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-primary/15 text-primary/70 transition-colors hover:border-accent hover:bg-accent hover:text-primary-dark"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
