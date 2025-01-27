import storybook from "eslint-plugin-storybook";

export default [
  ...storybook.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      storybook,
    },
    rules: {
      // Add your custom ESLint rules here
    },
    ignores: ["./node_modules"],
  },
];
