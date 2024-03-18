import { defineConfig } from "vite"; 

export default defineConfig({
  base: '/Utah-teapot/',
  root: 'src',
  build: {
    outDir:'../docs',
    emptyOutDir: true,
    }
});