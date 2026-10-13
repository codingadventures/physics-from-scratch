import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts", "test-helpers/**/*.test.ts", "src/**/*.test.ts"],
    environment: "node",
    // Exercise tests arrive with the module work packages. Until then only the
    // helper tests run. An empty run still passes.
    passWithNoTests: true,
  },
});
