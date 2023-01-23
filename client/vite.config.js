/* eslint-disable no-undef */
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 40498,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about", "index.html"),
        login: resolve(__dirname, "login", "index.html"),
        register: resolve(__dirname, "register", "index.html"),
      },
    },
    emptyOutDir: true,
    minify: false
  }
  ,
  preview: {
    port: 40498,
  }
});
