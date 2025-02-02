import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html', // Ensures index.html is processed
        quiz: 'src/scripts/quiz.js', // Ensures quiz.js is built
      },
    },
  },
});
