# Contributing & Team Workflow — Dhanora Dynasty Resort

Two developers working in parallel:

- **Frontend dev** — the public website UI/UX (the TanStack Start app).
- **Backend dev** — database, auth, admin panel, API, image uploads, VPS deploy.

> **Architecture decision:** we keep the **TanStack Start** app that Lovable generated
> (React 19 + Tailwind v4 + shadcn + React Query). It already does SSR (good for SEO) and
> supports server routes, so the **admin + API are built inside this same app** — one repo,
> one deploy. (No Next.js port.)

---

## Running the app (uses bun)

```bash
bun install      # first time
bun run dev      # start dev server (Vite) → open the printed localhost URL
bun run build    # production build
bun run preview  # preview the build
bun run lint     # eslint
```

---

## Git workflow

- `main` is always deployable. **Never commit directly to `main`.**
- Create a short-lived branch per task → push → open a **Pull Request** → the *other* dev
  reviews → **squash merge** → delete the branch.
- Keep PRs small. Pull `main` often to avoid conflicts.

### Branch naming

```
feat/fe-<task>     frontend feature        e.g. feat/fe-home-polish
feat/be-<task>     backend feature         e.g. feat/be-auth
fix/<area>-<task>  bug fix                 e.g. fix/fe-mobile-nav
chore/<task>       tooling/config          e.g. chore/ci-deploy
docs/<task>        documentation
```

### Everyday commands

```bash
git checkout main && git pull          # start from latest
git checkout -b feat/fe-home-polish    # new branch
# ...work, then:
git add -A && git commit -m "feat(fe): polish home hero and amenities"
git push -u origin feat/fe-home-polish # first push of the branch
# then open a PR on GitHub (or: gh pr create --fill)
```

Commit style: `type(scope): summary` — types `feat|fix|chore|docs|refactor|style`,
scope `fe` or `be`.

---

## Who owns which files (avoid editing the same files)

| Area | Owner | Paths |
|------|-------|-------|
| Pages, components, styling | Frontend | `src/routes/**`, `src/components/**`, `src/styles.css`, shadcn `ui/` |
| SEO (meta, sitemap, robots, JSON-LD) | Frontend | `src/routes/__root.tsx`, `src/routes/sitemap[.]xml.ts`, `public/` |
| Data layer / API client | Frontend (shape agreed with backend) | `src/lib/**` data hooks |
| Database, auth, admin, API, uploads | Backend | `src/server/**`, `server.ts`, `db/`, `prisma/`, admin routes |
| Deploy / infra | Backend | VPS, nginx, CI |

The **data model in `docs/PROJECT-PLAN.md`** (MenuItem, GalleryImage, User) is the contract
between frontend and backend — agree on any change to it together before building against it.

---

## Frontend dev — task plan

Work through these on separate `feat/fe-*` branches (one PR each):

1. **Foundation (`feat/fe-foundation`)**
   - `bun install`, `bun run dev`, click through all 6 pages.
   - Read `README.md`, `docs/PROJECT-PLAN.md`, `docs/lovable-guide.md`, and `content/`.
   - Confirm brand design tokens (oxblood `#441C1A`, gold `#C9A227`, ivory `#F7F2E7`,
     serif+sans fonts) in `src/styles.css` / Tailwind config; fix to match the brand.
   - Verify navbar, footer, and floating WhatsApp button use the **real** links & contact
     info (see `content/README.md`). Ensure `bun run build` and `bun run lint` pass.
2. **Per-page polish** (`feat/fe-home`, `feat/fe-rooms`, `feat/fe-menu`, `feat/fe-gallery`,
   `feat/fe-about`, `feat/fe-contact`) — make each match the content in `content/<page>` and
   the look in `docs/lovable-master-prompt.md`; add tasteful animations; check mobile.
3. **SEO (`feat/fe-seo`)** — per-route `<title>`/meta + Open Graph via TanStack head;
   `robots.txt`; verify the `sitemap.xml` route; JSON-LD (`Hotel`/`LodgingBusiness`,
   `Restaurant`, `LocalBusiness` with address/phone/geo); alt text on all images; canonical URLs.
4. **Data layer (`feat/fe-data`)** — move hardcoded menu/gallery into typed modules + React
   Query hooks behind a small client, so swapping placeholder → real API (from backend) is a
   one-line change. Match the agreed data model.
5. **Responsive + accessibility pass (`feat/fe-a11y`)** — mobile-first check, keyboard nav,
   focus states, color contrast (WCAG AA), Lighthouse.

## Backend dev — task plan (summary)

On `feat/be-*` branches: set up PostgreSQL + Prisma and the schema (MenuItem, GalleryImage,
User); seed menu/gallery from `content/`; build auth (sessions, argon2 hashing, rate limiting,
RBAC); the admin panel (CRUD for menu + gallery) and its API; image upload + optimization
stored on the VPS; then nginx + SSL + CI/CD. See `docs/PROJECT-PLAN.md`.
