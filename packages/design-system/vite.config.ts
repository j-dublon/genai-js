import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "react-design-ui",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    [react()],
    dts({
      rollupTypes: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "lib/components"),
      "@icons": resolve(__dirname, "lib/icons"),
      "@utils": resolve(__dirname, "lib/utils"),
      "@lib": resolve(__dirname, "lib"),
      "@hooks": resolve(__dirname, "lib/hooks"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.ts",
    css: false, //getting issues with tailwindcss v4 leaving this as false for now
  },
});
