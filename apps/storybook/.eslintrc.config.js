import storybook from "eslint-plugin-storybook";

export default [
  ...storybook.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {},
    ignores: ["./node_modules"],
  },
];
