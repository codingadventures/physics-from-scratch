import { defineConfig } from "astro/config";

// Served at https://codingadventures.github.io/physics-from-scratch/
export default defineConfig({
  site: "https://codingadventures.github.io",
  base: "/physics-from-scratch",
  trailingSlash: "always",
  vite: {
    // Visuals live in ../starter/src; let the dev server read them.
    server: { fs: { allow: [".."] } },
  },
});
