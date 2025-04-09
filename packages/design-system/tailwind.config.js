import sharedConfig from "../tailwind-config/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  prefix: "ds",
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "ds:before:border-core-black",
    "ds:before:border-core-yellow",
    "ds:before:border-core-white",
    "ds:before:border-secondary-blue",
    "ds:before:border-tertiary-blue-dark",
    "ds:before:border-ui-grey-300",
  ],

  plugins: [require("tailwind-scrollbar")],
};
