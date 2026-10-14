// ESLint flat config. The browser files are plain ES5 scripts so the app runs from file:// without a build.
const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
  { ignores: ["node_modules/", "dist/", "test-results/"] },
  js.configs.recommended,
  { rules: { "no-unused-vars": ["error", { caughtErrors: "none" }] } },
  {
    files: ["assets/**/*.js", "questions/**/*.js"],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
      globals: { ...globals.browser, EPSO_BANK: "writable", module: "readonly", self: "readonly" }
    }
  },
  {
    files: ["scripts/**/*.mjs", "tests/**/*.mjs"],
    languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: { ...globals.node, ...globals.browser } }
  },
  {
    files: ["eslint.config.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node }
  }
];
