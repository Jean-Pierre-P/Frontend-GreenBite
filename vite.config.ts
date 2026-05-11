import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para el BFF (Backend For Frontend)
      '/api/bff': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        secure: false,
        // Esto asegura que la ruta se mantenga correctamente al enviar al BFF
        rewrite: (path) => path.replace(/^\/api\/bff/, '/api/bff')
      },
      // Proxy para Microservicios directos (Auth, Usuarios, Pedidos)
      '/api': {
        target: 'http://localhost:8082', // Ajusta este puerto al de tu API Gateway o servicio principal
        changeOrigin: true,
        secure: false
      }
    }
  }
});