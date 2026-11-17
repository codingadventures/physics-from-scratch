import { defineConfig } from "vitest/config";

// `npm run oracle`: comparisons against Box2D Lite and Box2D. Not part of `npm test`, because
// these are diagnostics and yardsticks, not exercise tests.
export default defineConfig({
  test: {
    include: ["oracle/*.oracle.test.ts"],
    environment: "node",
    passWithNoTests: true,
    testTimeout: 30000,
  },
});
