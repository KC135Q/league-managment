import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy rules
      '/api': {
        target: 'http://localhost:3001', // Target backend server
        changeOrigin: true, // Needed for virtual hosted sites
        // No need for rewrite here since you want the path to stay the same
      },
      '/auth': {
        target: 'http://localhost:3001', // Target backend server
        changeOrigin: true, // Needed for virtual hosted sites
        // No need for rewrite here since you want the path to stay the same
      },
      // Add other paths to proxy as needed
    }
  }
})
