import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@store": resolve(__dirname, "src/store"),
    },
  },
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
    exclude: ["e2e/**/*", "node_modules", ".next", "dist"],
    alias: {
      "@": resolve(__dirname, "src"),
      "@services": resolve(__dirname, "src/services"),
      "@store": resolve(__dirname, "src/store"),
      "@validation": resolve(__dirname, "src/validation"),
      "@schema": resolve(__dirname, "src/schema"),
    },
    silent: "passed-only",
  },
});
