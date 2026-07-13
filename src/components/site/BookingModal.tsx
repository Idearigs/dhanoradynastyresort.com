import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84a11.8 11.8 0 0 0 1.6 5.94L0 24l6.4-1.68a11.86 11.86 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44ZM12.05 21.4h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.83 9.83 0 1 1 8.41 4.66Zm5.4-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.66-.51l-.57-.01c-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.44 0 1.44 1.04 2.83 1.19 3.02.15.2 2.06 3.15 5 4.41.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

/**
 * Where guests can book. Direct is listed first on purpose: the OTAs below charge the
 * resort roughly 15–20% commission, so a direct booking is worth materially more to
 * the owner than the same booking made through Booking.com or Agoda.
 */
const DIRECT = {
  href: "https://wa.me/94769725255",
  label: "Book Direct",
  note: "Message us on WhatsApp — best rate, no booking fees",
};

/**
 * Partner logos are the official wordmarks, self-hosted in public/images/booking/.
 * Shown solely to identify the site each link goes to (nominative use) — see the
 * notice in that folder.
 */
const PARTNERS = [
  {
    href: "https://www.booking.com/hotel/lk/dhanora-dynasty-resort.html",
    name: "Booking.com",
    logo: "/images/booking/booking.svg",
    note: "Free cancellation on most rooms",
  },
  {
    href: "https://www.agoda.com/dhanora-dynasty-resort/hotel/anuradhapura-lk.html?cid=1844104&ds=EqN2SisjO5K8%2B%2BIN",
    name: "Agoda",
    logo: "/images/booking/agoda.svg",
    note: "Popular with travellers in Asia",
  },
  {
    href: "https://www.tripadvisor.com/Hotel_Review-g304132-d34297225-Reviews-Dhanora_Dynasty_Resort-Anuradhapura_North_Central_Province.html",
    name: "Tripadvisor",
    logo: "/images/booking/tripadvisor.svg",
    note: "Read guest reviews, then book",
  },
];

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Stop the page behind the modal from scrolling.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal-deep/85 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-surface shadow-elegant"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          autoFocus
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
        >
          <X className="size-5" />
        </button>

        <div className="px-8 pt-9 pb-8">
          <p className="eyebrow mb-2">Reserve Your Stay</p>
          <h2 id="booking-title" className="mb-6 font-serif text-3xl text-primary">
            Book Your Stay
          </h2>

          <a
            href={DIRECT.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="group flex items-center gap-4 rounded-2xl bg-accent px-5 py-4 transition-colors hover:bg-accent-soft"
          >
            <WhatsAppMark className="size-6 shrink-0 text-charcoal" />
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-charcoal">{DIRECT.label}</span>
              <span className="block text-sm text-charcoal/75">{DIRECT.note}</span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-charcoal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Or book with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <ul className="space-y-3">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group flex items-center gap-4 rounded-2xl border border-border px-5 py-4 transition-colors hover:border-accent hover:bg-primary/5"
                >
                  {/* Fixed box so three very different logo aspect ratios still line up. */}
                  <span className="flex h-7 w-28 shrink-0 items-center">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain object-left"
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-sm text-muted-foreground">{p.note}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Booking partners open in a new tab.
          </p>
        </div>
      </div>
    </div>
  );
}
