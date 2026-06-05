// @ts-check
import { defineConfig } from 'astro/config';

// Static UI mockup. Tailwind v4 is wired through PostCSS (postcss.config.mjs),
// not the Vite plugin — Astro 6's rolldown-vite is currently incompatible with
// @tailwindcss/vite.
//
// GitHub Pages serves a project site under a subpath (username.github.io/REPO/).
// The CI workflow sets BASE_PATH=/REPO/ at build time; locally it stays '/', so
// `npm run dev` is unaffected. A tiny link shim in Layout.astro prepends the
// base to hand-written absolute hrefs so navigation works under the subpath.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  site: process.env.SITE_URL || undefined,
});
