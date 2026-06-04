// Tailwind v4 via PostCSS (Astro 6 ships rolldown-vite, which is currently
// incompatible with @tailwindcss/vite — PostCSS sidesteps that).
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
