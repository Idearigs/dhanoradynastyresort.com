import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/rooms", label: "Rooms" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur border-b border-accent/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-ivory">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-accent text-accent font-serif text-lg">
            D
          </span>
          <span className="font-serif text-xl tracking-wide">Dhanora Dynasty</span>
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
          <a
            href="https://wa.me/94769725255"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-primary-dark hover:bg-accent-soft transition-colors"
          >
            Inquire Now
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-ivory"
          aria-label="Open menu"
        >
          <Menu className="size-7" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-primary-dark transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-accent/20">
          <span className="font-serif text-xl text-ivory">Dhanora Dynasty</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-ivory">
            <X className="size-7" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-6 px-6 py-16">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-ivory hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/94769725255"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-full bg-accent px-8 py-3 text-primary-dark font-medium"
          >
            Inquire Now
          </a>
        </nav>
      </div>
    </header>
  );
}
