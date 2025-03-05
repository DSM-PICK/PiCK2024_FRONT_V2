import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import envCompatiblePlugin from 'vite-plugin-env-compatible'

export default defineConfig({
  base: "./",
  plugins: [react(), envCompatiblePlugin()],
  assetsInclude: ["**/*.jpg"],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [
      "pick-admin-stag.xquare.app",
      "pick-admin.xquare.app",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
