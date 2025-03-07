import sharedConfig from "../../packages/tailwind-config/tailwind.config";

export default {
  ...sharedConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "before:border-core-black",
    "before:border-core-yellow",
    "before:border-core-white",
    "before:border-secondary-blue",
    "before:border-secondary-blue-dark",
    "before:border-ui-grey-300",
  ],
};
