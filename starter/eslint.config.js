import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "coverage/", "node_modules/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Stubs keep their named parameters before the learner uses them,
      // so unused arguments are allowed. Unused variables are still errors.
      "@typescript-eslint/no-unused-vars": ["error", { args: "none", varsIgnorePattern: "^_" }],
    },
  },
);
