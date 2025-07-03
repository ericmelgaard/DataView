import { defineConfig } from 'vite';

export default defineConfig({
  root: './V60_DataView',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});