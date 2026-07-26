// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static export for shared hosting (cPanel/FTP, no Node runtime): prerender every
    // crawlable route to plain HTML. All public routes are prerendered, so no SPA shell is
    // needed — direct hits resolve to real static files (client-side nav takes over on hydrate).
    prerender: { enabled: true, crawlLinks: true },
    // Emit a real static sitemap.xml at build time (the old server route can't run on static
    // hosting). `host` makes the <loc> URLs absolute, as Google requires. Keep this in sync
    // with the canonical host enforced in public/.htaccess.
    sitemap: { enabled: true, host: "https://www.dhanoradynastyresort.com" },
    // /credits carries a noindex robots meta (image attributions), so keep it out of the sitemap.
    pages: [{ path: "/credits", sitemap: { exclude: true } }],
  },
});
