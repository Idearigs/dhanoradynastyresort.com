# Deploying to shared hosting (cPanel / FTP)

The public site is a **static, prerendered** build of the TanStack Start app. There is **no
Node.js on the server** — Apache serves plain HTML/CSS/JS. The admin API is separate **plain
PHP + MySQL** (see Phase 2, `docs/PROJECT-PLAN.md`).

## What gets built

`npm run build` (or `bun run build`) prerenders every route to static HTML and writes the
deployable site to **`dist/client/`**:

```
dist/client/
  index.html            # home (/)
  about/index.html      # /about
  rooms/index.html      # /rooms
  menu/index.html       # /menu
  gallery/index.html    # /gallery
  contact/index.html    # /contact
  credits/index.html    # /credits  (noindex; not in sitemap)
  assets/               # hashed JS/CSS (cache-forever)
  images/  videos/      # static media committed to the repo
  sitemap.xml           # generated, absolute URLs
  robots.txt  404.html  .htaccess
```

Config that makes this work lives in `vite.config.ts` (`prerender`, `sitemap`, `pages`).

## Server layout (public_html)

Upload the **contents of `dist/client/`** into `public_html/`. Phase 2 adds two siblings that
are **not** produced by the build and must be preserved across deploys:

```
public_html/
  index.html, about/, menu/, assets/, …   ← from dist/client (replaced every deploy)
  sitemap.xml robots.txt 404.html .htaccess
  api/        ← plain PHP endpoints + MySQL config   (Phase 2 — do NOT overwrite)
  uploads/    ← images uploaded via the admin panel  (Phase 2 — do NOT overwrite)
  admin/      ← admin panel                           (Phase 3)
```

> ⚠️ A deploy must only replace the static site files. Never delete `api/`, `uploads/`, or
> `admin/`. The GitHub Action (Phase 4) is scoped to the static paths for this reason.

## Manual deploy (now)

1. `npm install` (first time; this repo uses **bun** normally — `bun install` if available).
2. `npm run build`
3. FTP the **contents** of `dist/client/` into `public_html/` (overwrite existing site files).
   - Make sure hidden files are shown so **`.htaccess`** uploads too.
4. Visit the domain; hard-refresh. Check `/menu`, `/rooms`, and `view-source:` shows real
   content in the HTML (not an empty shell).

## Automated deploy (Phase 4 — one-button publish)

When the owner edits menu/gallery/rooms in the admin panel and clicks **Publish**, PHP fires a
GitHub `repository_dispatch`. A GitHub Action then:

1. checks out `main`, `npm ci`,
2. runs a prebuild step that pulls current data from the live `/api` and bakes it into the
   static pages (so the SEO snapshot matches the database),
3. `npm run build`,
4. **FTP-uploads `dist/client/`** to `public_html/` (scoped to static paths — see warning above).

Between publishes, visitors already see live edits because the pages also re-fetch from `/api`
after hydration. The rebuild only refreshes the crawlable HTML snapshot.

## .htaccess notes

- Pretty URLs: `/menu` serves `menu/index.html` in one hit (no trailing-slash 301).
- Hashed assets cache for a year; **HTML always revalidates** so a re-upload goes live at once.
- The canonical-host + HTTPS redirect block is **commented out** — enable it once the domain and
  SSL are active, and keep the host in sync with `sitemap.host` in `vite.config.ts`.

## SEO checklist for this static build

- [x] Every page prerendered to HTML with its own `<title>`/meta (view-source to confirm).
- [x] `sitemap.xml` with absolute URLs; `robots.txt` points to it.
- [ ] Enable the canonical-host/HTTPS redirect in `.htaccess` after go-live.
- [ ] (Nice-to-have) per-page canonical `<link>` and JSON-LD (`LodgingBusiness` / `Restaurant`).
