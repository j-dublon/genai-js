import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

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
          "icons/index": resolve(__dirname, "./lib/icons/index.ts"),
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
        include: ["lib/**/*.ts", "lib/**/*.tsx"],
        insertTypesEntry: true,
        copyDtsFiles: true,
      }),
    ],
    resolve: {
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
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setup-test.ts",
      css: false, //getting issues with tailwindcss v4 leaving this as false for now
    },
  };
});
