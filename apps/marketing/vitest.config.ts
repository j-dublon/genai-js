import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
    },
    clearMocks: true,
    testTransformMode: {
      web: [".tsx", ".ts"],
    },
    exclude: ["node_modules", ".next", "dist"],
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
