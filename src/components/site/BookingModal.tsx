import { useEffect } from "react";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";

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

const PARTNERS = [
  {
    href: "https://www.booking.com/hotel/lk/dhanora-dynasty-resort.html",
    name: "Booking.com",
    note: "Free cancellation on most rooms",
  },
  {
    href: "https://www.agoda.com/dhanora-dynasty-resort/hotel/anuradhapura-lk.html?cid=1844104&ds=EqN2SisjO5K8%2B%2BIN",
    name: "Agoda",
    note: "Popular for travellers in Asia",
  },
  {
    href: "https://www.tripadvisor.com/Hotel_Review-g304132-d34297225-Reviews-Dhanora_Dynasty_Resort-Anuradhapura_North_Central_Province.html",
    name: "Tripadvisor",
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
            <MessageCircle className="size-6 shrink-0 text-charcoal" />
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
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-primary">{p.name}</span>
                    <span className="block text-sm text-muted-foreground">{p.note}</span>
                  </span>
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
