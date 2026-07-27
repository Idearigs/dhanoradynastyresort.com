import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

/**
 * Private content admin panel. Prerendered to a static shell (see vite.config.ts
 * `pages`) so /admin resolves on shared hosting, but marked noindex/nofollow and
 * excluded from the sitemap. All data is fetched client-side from /api after mount.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Dhanora Dynasty Resort" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminApp,
});
