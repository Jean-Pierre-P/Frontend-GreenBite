import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/bff': {
        target: 'http://localhost:8082', // Tu BFF
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bff/, '/api/bff')
      },
      '/api': {
        target: 'http://localhost:8080', // Microservicio de Login/Auth
        changeOrigin: true,
        secure: false
      }
    }
  }
});