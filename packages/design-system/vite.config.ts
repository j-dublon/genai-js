import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isDevMode = mode === "development";
  return {
    build: {
      minify: true,
      lib: {
        entry: {
          "index.client": resolve(__dirname, "./lib/index.client.ts"),
          "index.server": resolve(__dirname, "./lib/index.server.ts"),
        },
        name: "react-design-ui",
        fileName: (format, eN) => `${eN}.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
      sourcemap: true,
      emptyOutDir: !isDevMode,
    },
    plugins: [
      react(),
      tailwindcss(),
      dts({
        rollupTypes: !isDevMode,
        insertTypesEntry: true,
      }),
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
  };
});
