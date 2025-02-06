import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths({
      projects: ["../../packages/design-system/tsconfig.json"],
    }),
  ],
  resolve: {
    alias: {
      react: resolve(__dirname, "./node_modules/react"),
      "react-dom": resolve(__dirname, "./node_modules/react-dom"),
    },
  },
});
