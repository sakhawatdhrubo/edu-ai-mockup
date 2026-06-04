// @ts-check
import { defineConfig } from 'astro/config';

// Static UI mockup. Tailwind v4 is wired through PostCSS (postcss.config.mjs),
// not the Vite plugin — Astro 6's rolldown-vite is currently incompatible with
// @tailwindcss/vite.
export default defineConfig({});
