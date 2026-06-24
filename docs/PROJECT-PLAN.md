# Dhanora Dynasty Resort — Rebuild Project Plan

Renewing the existing site (https://www.dhanoradynastyresort.com/) — current site is
not user-friendly and looks dated. Goal: modern, fast, **SEO-friendly** resort site with a
**secure admin panel** to manage the **menu** and **gallery**.

## Team & ways of working

- **2 developers**, both **pairing across the whole stack** (no fixed front/back split).
- **2 Claude Code accounts** → work in parallel, roughly halving per-account usage.
- **Lovable (free)** generates the UI; **Claude Code** does architecture, Next.js port,
  SEO, backend, auth, admin, and VPS deployment. See `lovable-guide.md`.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Frontend approach | Lovable generates UI → Claude Code ports to **Next.js** for SEO |
| Roles | Pair on everything |
| Image storage | **On the VPS** (not Cloudinary) |
| Framework | Next.js (App Router, TypeScript, Tailwind, shadcn/ui) — one app for site + admin + API |
| Database | PostgreSQL + Prisma |
| Auth | Auth.js (credentials) + argon2 hashing, rate limiting, CSRF, RBAC, optional 2FA |
| Hosting | VPS: Node + PM2 behind nginx + Let's Encrypt SSL |
| CI/CD | GitHub Actions → deploy to VPS on push to `main` |
| Source control | GitHub |

## Architecture (single Next.js app)

```
Public site (SSG/ISR, SEO)  ─┐
Admin panel (/admin, auth)  ─┼─►  Next.js app  ─►  Prisma  ─►  PostgreSQL (VPS)
API routes (/api)           ─┘                         │
                                                       └─►  Image files on VPS disk
                                                            (served by nginx, optimized w/ sharp)
```

## Image storage on the VPS (since we're not using Cloudinary)

- Uploaded images saved to a directory **outside** the git repo, e.g. `/var/www/dhanora/uploads/`.
- On upload: validate type/size, generate optimized/resized variants with **sharp**
  (e.g. thumb / medium / full, WebP), store filenames + metadata (caption, order, category) in Postgres.
- **nginx serves `/uploads/`** directly with long cache headers (fast, CDN-like).
- Next.js `next.config` → allow that image domain/path; use `next/image` for the public gallery.
- **Backups:** nightly cron → tar uploads + `pg_dump` → off-VPS copy.

## Data model (the contract — agree before parallel work)

- **MenuItem**: id, category (Appetizer|Soup|MainCourse|Dessert|Drinks), name, description, price?, isAvailable, sortOrder, timestamps.
- **GalleryImage**: id, filename, caption?, sortOrder, isPublished, timestamps.
- **User (admin)**: id, email, passwordHash, role, twoFactorSecret?, timestamps.

## Git workflow (important for pairing)

- `main` = protected, always deployable, auto-deploys.
- **One feature branch per task**; small, frequent PRs; the other person reviews before merge.
- Since you pair on everything: **claim a task in GitHub Issues before starting** so you
  don't both edit the same file. Pull `main` often.
- Conventional commits.

## Phased plan

1. **Setup (together):** GitHub repo, Next.js skeleton, Prisma + Postgres, Tailwind/shadcn,
   move `content/` in, agree data model + API, basic VPS prep, branch protection.
2. **Design + contract:** generate UI in Lovable (`lovable-guide.md`); finalize schema + API endpoints.
3. **Parallel build:** public pages + SEO  ·  DB + auth + admin CRUD + image upload + API.
4. **Integration:** wire public pages to live data; contact form; end-to-end test.
5. **Deploy + harden:** nginx + SSL + secrets, security review, Lighthouse/SEO audit, backups.
6. **Launch:** DNS cutover, monitoring.

## SEO checklist (Next.js)

- Per-page `<title>`/meta via Metadata API; Open Graph + Twitter cards.
- `sitemap.xml` + `robots.txt`.
- JSON-LD structured data: `Hotel`/`LodgingBusiness` + `Restaurant` (menu) + `LocalBusiness` (address, geo, phone).
- SSG/ISR so pages are server-rendered HTML; optimized images; fast Core Web Vitals.
- Semantic headings, alt text on all gallery images, canonical URLs.
