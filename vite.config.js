import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Safely get VITE_BASE_PATH with fallback
function getBasePath() {
  // import.meta.env contains Vite environment variables
  const env = import.meta.env || {}
  return env.VITE_BASE_PATH || '/'
}

// Safely get the API URL for local development
function getApiTarget() {
  const env = import.meta.env || {}
  // For local development, use localhost:5000
  // For production deployments, the API is handled by the centralized config in api.js
  // and doesn't go through the Vite proxy
  if (env.PROD || env.VERCEL === 'true') {
    return env.VITE_API_URL || 'https://moorwohs.onrender.com'
  }
  return env.VITE_API_URL || 'http://localhost:5000'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: getApiTarget(),
        changeOrigin: true,
      },
    },
  },
  base: getBasePath(),
})

