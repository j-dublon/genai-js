import sharedConfig from "../../packages/tailwind-config/tailwind.config";

export default {
  ...sharedConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
