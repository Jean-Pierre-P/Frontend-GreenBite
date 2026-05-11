import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. Redirige las peticiones de productos al BFF
      // Se activa cuando en el código usas '/api/bff/...'
      '/api/bff': {
        target: 'http://localhost:8082', // Puerto donde corre tu greenbite-bff
        changeOrigin: true,
        secure: false,
        // Mantiene la ruta completa al enviarla al backend de Java
        rewrite: (path) => path.replace(/^\/api\/bff/, '/api/bff')
      },
      // 2. Redirige el Login, Registro y Usuarios al microservicio de Auth
      // Se activa cuando en el código usas '/api/auth/...' o '/api/usuarios/...'
      '/api': {
        target: 'http://localhost:8080', // Puerto por defecto de Spring Boot (Login/Auth)
        changeOrigin: true,
        secure: false
      }
    }
  }
});