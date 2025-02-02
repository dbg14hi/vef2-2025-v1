import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: false, // ❌ Do NOT delete `dist/`
  },
  plugins: [
    {
      name: 'copy-html-files',
      closeBundle() {
        const htmlFiles = ['js.html', 'css.html', 'html.html']; // Add any extra files
        htmlFiles.forEach((file) => {
          const srcPath = path.resolve('dist', file);
          const destPath = path.resolve('dist', file);
          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`✅ Copied ${file} to dist/`);
          }
        });
      },
    },
  ],
});
