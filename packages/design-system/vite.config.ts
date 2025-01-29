import { defineConfig, UserConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "react-design-ui",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react() as UserConfig["plugins"],
    dts({ rollupTypes: true }) as any,
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "lib/components"),
      "@icons": resolve(__dirname, "lib/icons"),
      "@utils": resolve(__dirname, "lib/utils"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.ts",
    css: true,
  },
});
