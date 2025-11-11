import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure uppercase image extensions are treated as static assets
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
