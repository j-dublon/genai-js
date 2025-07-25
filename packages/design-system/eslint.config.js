import js from "@eslint/js";
import * as tsEslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import vitest from "@vitest/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["lib/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: true,
        gtag: "readonly",
        Gtag: "readonly",
      },
      parser: parser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsEslint,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.{test,spec}.{js,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.vitest,
        vi: true,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    files: ["vite.config.ts", "vitest.config.ts"],
    rules: {
      "simple-import-sort/imports": "off",
    },
  },
];
