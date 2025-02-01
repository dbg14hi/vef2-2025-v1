import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist',  // ✅ Serve from /dist
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',  // Ensure build output goes to /dist
  },
});
