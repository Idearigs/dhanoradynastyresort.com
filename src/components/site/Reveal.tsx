import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveals an element the first time it scrolls into view — a soft fade + rise, the signature
 * motion of modern editorial/travel sites. Respects prefers-reduced-motion (elements simply
 * start visible). Once shown it stays shown, so content never flickers on scroll-up.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
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

  return { ref, shown };
}

/**
 * Wrapper that fades + rises its children into view. `delay` (ms) staggers siblings.
 * Use `as` to change the rendered element (defaults to a div).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const { ref, shown } = useReveal();
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
