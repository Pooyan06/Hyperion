import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';
import eslintPlugin from 'vite-plugin-eslint'; // ← اضافه شد

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint(),
    eslintPlugin({
      cache: false, // برای حذف مشکل کش
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules', 'dist'],
    }),
  ],
});
