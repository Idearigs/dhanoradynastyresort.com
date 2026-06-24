import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary/60 to-primary-dark/80" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-ivory">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="font-serif text-5xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-ivory/85 text-lg">{subtitle}</p>
        )}
        <span className="hairline mt-6" />
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-3xl mb-14 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-4xl md:text-5xl text-primary">{title}</h2>
      {description && (
        <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
