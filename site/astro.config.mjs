import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Served at https://codingadventures.github.io/physics-from-scratch/
// Math: $...$ inline and $$...$$ display, rendered by KaTeX at build time.
// The same syntax renders on GitHub, so the Markdown reads well in both places.
export default defineConfig({
  site: "https://codingadventures.github.io",
  base: "/physics-from-scratch",
  trailingSlash: "always",
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
  vite: {
    // Visuals live in ../starter/src; let the dev server read them.
    server: { fs: { allow: [".."] } },
  },
});
