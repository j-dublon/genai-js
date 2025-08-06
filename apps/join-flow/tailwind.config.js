import sharedConfig from "../../packages/tailwind-config/tailwind.config";

export default {
  ...sharedConfig,
  important: "#app-root",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
