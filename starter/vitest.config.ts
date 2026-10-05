import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    // Exercise tests arrive with WP-02. Until then an empty run is a pass.
    passWithNoTests: true,
  },
});
