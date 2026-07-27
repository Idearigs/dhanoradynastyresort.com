# Dhanora Dynasty Resort — Admin API (plain PHP + MySQL)

Phase 2 of the rebuild (see `docs/PROJECT-PLAN.md`). Runs on **shared hosting
(cPanel, no Composer, no Node)**. Deployed to `public_html/api/`, siblings the
static frontend and the `uploads/` directory.

```
api/
  index.php            front controller — routes /api/* by method + path
  .htaccess            rewrite everything to index.php; deny direct file access
  config.example.php   copy to config.php (gitignored) and fill in DB creds
  schema.sql           MySQL DDL — import once
  seed.php             CLI: load real content + create the first admin
  lib/                 config, db (PDO), response (JSON+CORS), request (validation), auth (session/argon2id/CSRF)
  routes/              menu, gallery, rooms, auth, uploads handlers
```

## Setup

1. **Create the database** in cPanel → *MySQL Databases* (DB + user, grant all).
2. **Import the schema**: phpMyAdmin → *Import* → `schema.sql` (or
   `mysql -u USER -p DB < schema.sql`).
3. **Configure**: copy `config.example.php` → `config.php` and fill in the DB
   name/user/password. Set `cookie_secure => true` and `env => 'prod'` once HTTPS is live.
4. **Seed + create admin** (cPanel *Terminal*, or locally against the same DB):
   ```
   php seed.php --admin-email=you@example.com --admin-password='S3cret!'
   ```
   Re-run with `--force` to wipe and reload content. Admins are never wiped.

## Endpoints

Public read (consumed by the static site after hydration):

| Method | Path            | Notes                                             |
|--------|-----------------|---------------------------------------------------|
| GET    | `/api/menu`     | categories with nested **available** items, no prices |
| GET    | `/api/gallery`  | published images (flat, ordered)                  |
| GET    | `/api/rooms`    | published rooms with nested images                |

Auth:

| Method | Path              | Body / notes                          |
|--------|-------------------|---------------------------------------|
| POST   | `/api/auth/login` | `{ email, password }` → sets session, returns `csrfToken` |
| POST   | `/api/auth/logout`| requires auth + `X-CSRF-Token`        |
| GET    | `/api/auth/me`    | current user or 401                   |
| GET    | `/api/auth/csrf`  | `{ csrfToken }`                       |

Admin (all require a logged-in session; **writes also require the
`X-CSRF-Token` header**):

- Menu categories: `GET/POST /api/menu/categories`, `PUT/DELETE /api/menu/categories/{id}`
- Menu items: `GET /api/menu/items[?category=ID]`, `POST /api/menu/items`, `PUT/DELETE /api/menu/items/{id}`
- Gallery: `GET /api/gallery?all=1`, `POST /api/gallery`, `PUT/DELETE /api/gallery/{id}`
- Rooms: `GET /api/rooms?all=1`, `POST /api/rooms`, `PUT/DELETE /api/rooms/{id}`
- Room images: `POST /api/rooms/{id}/images`, `DELETE /api/rooms/{id}/images/{imageId}`
- Uploads: `POST /api/uploads` (multipart: `file`, `dir` = rooms|gallery|menu) → `{ src }`

### Auth flow for the admin panel (Phase 3)

1. `POST /api/auth/login` → keeps the session cookie, returns a `csrfToken`.
2. Send that token as the `X-CSRF-Token` header on every POST/PUT/PATCH/DELETE.
3. `GET /api/auth/me` on load to restore the session (and get a fresh token).

## Security notes

- Passwords hashed with **argon2id** (`password_hash`), verified constant-time.
- All SQL uses **prepared statements**; table names in queries are fixed literals.
- Session cookie is `HttpOnly` + `SameSite=Lax`; set `Secure` under HTTPS.
- **CSRF**: double-checked token in the session vs the `X-CSRF-Token` header.
- Uploads validated by real MIME (`finfo`), size-capped, stored with random names.
- `.htaccess` denies web access to `config.php`, `*.sql`, `seed.php`, and `lib/`.

## Local development

`config.php` → set `env => 'dev'`, add your Vite origin to `cors_allowed_origins`
(e.g. `http://localhost:8080`), then serve the folder with PHP's built-in server:

```
php -S localhost:8000 -t .    # from public_html/, so /api/index.php resolves
```

The frontend fetches `/api/...` (same origin in prod). For split-origin dev, point
the API client at `http://localhost:8000/api` and keep the CORS allow-list in sync.
