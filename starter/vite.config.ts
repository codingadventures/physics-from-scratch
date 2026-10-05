import { defineConfig } from "vite";

// Demos and the debug-draw harness are added by WP-03. Relative base so the
// build also works when served from a sub-path such as GitHub Pages.
export default defineConfig({
  base: "./",
});
