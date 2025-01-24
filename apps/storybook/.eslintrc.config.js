import storybook from "eslint-plugin-storybook";

export default [
  ...storybook.configs.recommended,
  {
    extends: ["plugin:storybook/recommended"],
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {},
  },
];
