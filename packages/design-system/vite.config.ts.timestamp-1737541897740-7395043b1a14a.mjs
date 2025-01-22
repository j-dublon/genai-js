// vite.config.ts
import { defineConfig } from "file:///Users/ruowyong/Documents/Cuckoo/website-rework/node_modules/vite/dist/node/index.js";
import react from "file:///Users/ruowyong/Documents/Cuckoo/website-rework/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import dts from "file:///Users/ruowyong/Documents/Cuckoo/website-rework/node_modules/vite-plugin-dts/dist/index.mjs";
import tailwindcss from "file:///Users/ruowyong/Documents/Cuckoo/website-rework/packages/design-system/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "/Users/ruowyong/Documents/Cuckoo/website-rework/packages/design-system";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./lib/index.ts"),
      name: "react-beautiful-timeline",
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss"
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    tailwindcss()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  resolve: {
    alias: {
      "@components": resolve(__vite_injected_original_dirname, "lib/components"),
      "@icons": resolve(__vite_injected_original_dirname, "lib/icons"),
      "@utils": resolve(__vite_injected_original_dirname, "lib/utils")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcnVvd3lvbmcvRG9jdW1lbnRzL0N1Y2tvby93ZWJzaXRlLXJld29yay9wYWNrYWdlcy9kZXNpZ24tc3lzdGVtXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcnVvd3lvbmcvRG9jdW1lbnRzL0N1Y2tvby93ZWJzaXRlLXJld29yay9wYWNrYWdlcy9kZXNpZ24tc3lzdGVtL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ydW93eW9uZy9Eb2N1bWVudHMvQ3Vja29vL3dlYnNpdGUtcmV3b3JrL3BhY2thZ2VzL2Rlc2lnbi1zeXN0ZW0vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vbGliL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJyZWFjdC1iZWF1dGlmdWwtdGltZWxpbmVcIixcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaW5kZXguJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiLCBcInRhaWx3aW5kY3NzXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogXCJSZWFjdFwiLFxuICAgICAgICAgIFwicmVhY3QtZG9tXCI6IFwiUmVhY3RET01cIixcbiAgICAgICAgICB0YWlsd2luZGNzczogXCJ0YWlsd2luZGNzc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCkgYXMgVXNlckNvbmZpZ1tcInBsdWdpbnNcIl0sXG4gICAgZHRzKHsgcm9sbHVwVHlwZXM6IHRydWUgfSkgYXMgYW55LFxuICAgIHRhaWx3aW5kY3NzKCksXG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpXSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQGNvbXBvbmVudHNcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwibGliL2NvbXBvbmVudHNcIiksXG4gICAgICBcIkBpY29uc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvaWNvbnNcIiksXG4gICAgICBcIkB1dGlsc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvdXRpbHNcIiksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLG9CQUFnQztBQUM3YSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDMUMsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEsYUFBYTtBQUFBLE1BQzlDLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJLEVBQUUsYUFBYSxLQUFLLENBQUM7QUFBQSxJQUN6QixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFlBQVksQ0FBQztBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsZUFBZSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ2xELFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDeEMsVUFBVSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxJQUMxQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
