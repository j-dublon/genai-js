import sharedConfig from "../../packages/tailwind-config/tailwind.config";

export default {
  ...sharedConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [],
};
