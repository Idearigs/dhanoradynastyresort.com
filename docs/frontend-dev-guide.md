# Frontend Developer Guide (with Claude Code)

Welcome! You own the **public website** — the TanStack Start app. This guide gets you from a
fresh clone to shipping your first PR. Pair it with the root `CLAUDE.md` and `CONTRIBUTING.md`.

## 1. One-time setup

```bash
git clone https://github.com/Idearigs/dhanoradynastyresort.com.git
cd dhanoradynastyresort.com
bun install
bun run dev          # open the printed localhost URL, click through all 6 pages
```

Set your git identity if you haven't:
```bash
git config user.name  "Your Name"
git config user.email "you@example.com"
```

## 2. Your branch

Your starter branch already exists on GitHub:
```bash
git checkout main && git pull
git checkout feat/fe-foundation
```
For each later task make a new branch off fresh `main`:
```bash
git checkout main && git pull
git checkout -b feat/fe-home          # see naming in CONTRIBUTING.md
```

## 3. How to work with Claude Code on this project

When you open Claude Code in this folder it auto-reads `CLAUDE.md`. Good habits:

- **Point it at the source of truth.** e.g. *"Read content/03-rooms/rooms.md and make the
  Rooms page match it exactly, using the existing shadcn components."*
- **One page / one concern per session** — keeps diffs small and PRs reviewable.
- **Have it verify its own work:** *"Run bun run build and bun run lint and fix any errors."*
- **Keep the design system:** *"Use the existing Tailwind tokens and shadcn components; don't
  add new libraries."*
- **Don't touch backend files** (`src/server`, db, auth, admin) — that's the other dev.

### Example prompts

- *"On feat/fe-foundation: check src/styles.css uses brand tokens oxblood #441C1A, gold
  #C9A227, ivory #F7F2E7; fix the fonts to a serif heading + sans body. Then make the navbar,
  footer and WhatsApp button use the real links/contact info from content/README.md."*
- *"Refine the Home page (src/routes/index.tsx) to match docs/lovable-master-prompt.md — hero,
  amenities grid, experiences, menu preview, closing CTA. Add tasteful scroll animations and
  check mobile."*
- *"Add SEO: per-route title/description + Open Graph in the route head, a robots.txt, JSON-LD
  for Hotel + Restaurant + LocalBusiness, and alt text on every image."*

## 4. Your task order (one PR each)

1. `feat/fe-foundation` — run app, read `content/` + docs, fix brand tokens/fonts, real
   nav/footer/WhatsApp links, ensure `bun run build` + `bun run lint` pass.
2. Per-page polish: `feat/fe-home`, `feat/fe-rooms`, `feat/fe-menu`, `feat/fe-gallery`,
   `feat/fe-about`, `feat/fe-contact` (match each `content/<page>` file).
3. `feat/fe-seo` — metadata, OG, robots.txt, JSON-LD, alt text (sitemap route already exists).
4. `feat/fe-data` — move hardcoded menu/gallery into typed React Query hooks behind a client,
   so swapping to the backend API later is one line. Match the data model in PROJECT-PLAN.md.
5. `feat/fe-a11y` — responsive + accessibility + Lighthouse pass.

## 5. Shipping a PR

```bash
git add -A
git commit -m "feat(fe): match Rooms page to content"
git push -u origin feat/fe-rooms
gh pr create --fill            # or open the PR on GitHub
```
`main` is protected: a PR **needs 1 approval** (from the other dev) before it merges. After
merge, delete the branch and start the next task.

## 6. Definition of done (per page)

- Copy matches the relevant `content/` file (no placeholder text/contact info).
- Looks right on mobile and desktop; images have alt text.
- `bun run build` and `bun run lint` pass.
- Uses existing shadcn components + brand tokens (no new UI libraries).
