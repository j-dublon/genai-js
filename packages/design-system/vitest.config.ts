import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.ts",
  },
  plugins: [tsconfigPaths()], // Ensures @hooks/* resolves correctly
});
