# CLAUDE.md — Dhanora Dynasty Resort

Project context for Claude Code. Read this first, then `CONTRIBUTING.md` and `docs/PROJECT-PLAN.md`.

## What this is

Rebuild of the Dhanora Dynasty Resort website (luxury heritage resort in Anuradhapura, Sri
Lanka). Goals: a modern, fast, **SEO-friendly** public site + a **secure admin panel** to
manage the **menu** and **gallery (hotel photos)**.

## Tech stack

- **TanStack Start** (React 19, SSR) + **Vite** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Radix) + **lucide-react** icons
- **TanStack Router** (file-based routes in `src/routes/`)
- **React Query** (`@tanstack/react-query`) for data fetching
- **react-hook-form** + **zod** for forms
- Package manager: **bun**
- Hosting: **shared hosting (cPanel / FTP, no Node runtime).** The public site ships as a
  **static prerendered build** of this app (`npm run build` → `dist/client/`, deployed to
  `public_html`). See `docs/DEPLOY.md`.
- Backend: **plain PHP + MySQL** under `/api` (no Composer), session auth (argon2id), images
  uploaded via PHP to `/uploads/` and served by Apache. See `docs/PROJECT-PLAN.md`.

> Architecture decision: we keep TanStack Start — **no Next.js port** — but **prerender it to
> static HTML** for shared hosting (config in `vite.config.ts`: `prerender`, `sitemap`, `pages`).
> The admin API is a **separate PHP app**, not TanStack server routes (shared hosting has no Node).
> Menu/gallery/rooms are baked into the static pages at build time *and* re-fetched client-side;
> a "Publish" button rebuilds + FTP-deploys via GitHub Actions.

## Commands

```bash
bun install        # install deps
bun run dev        # dev server
bun run build      # production build (run before pushing)
bun run preview    # preview the build
bun run lint       # eslint
bun run format     # prettier
```

## Repo structure

```
src/routes/        page routes: index, about, rooms, menu, gallery, contact, sitemap[.]xml
src/components/     site/ (page sections)  +  ui/ (shadcn primitives)
src/lib/           helpers, data hooks (frontend API client lives here)
src/styles.css     Tailwind v4 + design tokens
content/           content extracted from the old site, one folder per page (source of truth for copy)
docs/              PROJECT-PLAN.md, lovable-guide.md, lovable-master-prompt.md
```

## Conventions

- TypeScript everywhere; prefer typed data. Use shadcn/ui + Tailwind utility classes; don't
  add new UI libraries.
- Brand tokens: oxblood `#441C1A` (primary, dark `#2E1210`), gold `#C9A227`, ivory `#F7F2E7`,
  charcoal `#1A1A1A`; serif headings + sans body. Keep gold as an accent only.
  Tokens are defined as oklch in `src/styles.css` — that file is the source of truth.
- Use **real** content from `content/` (room details, menu, contact info, social links) — no
  lorem ipsum, no placeholder phone/email.
- Run `bun run build` and `bun run lint` before opening a PR.

## Workflow (see CONTRIBUTING.md)

- Never commit to `main` (it's protected). Branch → push → PR → the other dev reviews →
  squash merge → delete branch. Naming: `feat/fe-*`, `feat/be-*`, `fix/*`, `chore/*`, `docs/*`.
- File ownership: frontend owns `src/routes`, `src/components`, `src/styles.css`, SEO;
  backend owns server/db/auth/admin. The data model in `docs/PROJECT-PLAN.md` is the contract.

## Gotchas

- The old site's homepage menu (Sri Lankan dishes) and `/menu` page (Western dishes) disagree —
  **confirm the real menu with the owner** before finalizing.
- Resort images are stored on the VPS (not in git); `/uploads/` is gitignored.
- This repo was imported once from the Lovable repo (`Minuka2022/royal-heritage-design`); further
  Lovable edits won't auto-flow here — make changes in this repo via Claude Code.
