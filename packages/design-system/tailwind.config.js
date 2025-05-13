import sharedConfig from "../tailwind-config/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  prefix: "ds",
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  safelist: [],
};
