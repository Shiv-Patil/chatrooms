import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: __dirname + "/dist",
    // Keep the /dist folder clean by purging it before each compilation
    emptyOutDir: true,
    minify: "terser",
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
