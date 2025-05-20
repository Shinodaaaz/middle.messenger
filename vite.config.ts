import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  assetsInclude: ["**/*.ttf", "**/*.woff2"],
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `
          @import "src/styles/helpers/variables.styl"
          @import "src/styles/helpers/mixins.styl"
        `
      }
    }
  }
});