import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Safely get VITE_BASE_PATH with fallback
function getBasePath() {
  // import.meta.env contains Vite environment variables
  const env = import.meta.env || {}
  return env.VITE_BASE_PATH || '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  base: getBasePath(),
})
