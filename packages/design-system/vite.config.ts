import { defineConfig, UserConfig } from "vite";
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
      name: "react-beautiful-timeline",
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
      "@hooks": resolve(__dirname, "lib/hooks"),
    },
  },
});
