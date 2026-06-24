# Dhanora Dynasty Resort — Website

Rebuild of [dhanoradynastyresort.com](https://www.dhanoradynastyresort.com/) — a modern,
SEO-friendly resort website with a secure admin panel to manage the menu and gallery.

## Repository layout

| Path | Purpose |
|------|---------|
| `docs/` | Project plan, architecture, and the Lovable prompts |
| `content/` | Content extracted from the old site, one folder per page |
| _(frontend)_ | Lovable-generated UI → ported to Next.js (added during the build) |

## Start here

- **Plan & architecture:** [`docs/PROJECT-PLAN.md`](docs/PROJECT-PLAN.md)
- **How we use Lovable:** [`docs/lovable-guide.md`](docs/lovable-guide.md)
- **The master prompt:** [`docs/lovable-master-prompt.md`](docs/lovable-master-prompt.md)
- **Old-site content:** [`content/README.md`](content/README.md)

## Stack (planned)

Next.js (App Router, TypeScript, Tailwind, shadcn/ui) · PostgreSQL + Prisma ·
Auth.js · images stored on the VPS (nginx + sharp) · hosted on VPS (PM2 + nginx + SSL) ·
CI/CD via GitHub Actions.
