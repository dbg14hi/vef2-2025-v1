import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // 👈 Set the root to `src/`
  build: {
    outDir: '../dist', // 👈 Ensures output goes into `dist/`
    emptyOutDir: true,
  },
});
