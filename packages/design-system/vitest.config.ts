import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      "@components": resolve(__dirname, "lib/components"),
      "@icons": resolve(__dirname, "lib/icons"),
      "@utils": resolve(__dirname, "lib/utils"),
      "@lib": resolve(__dirname, "lib"),
      "@hooks": resolve(__dirname, "lib/hooks"),
      "@contexts": resolve(__dirname, "lib/contexts"),
      "@providers": resolve(__dirname, "lib/providers"),
    },
  },
});
