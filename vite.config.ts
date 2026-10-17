import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Custom domain serves the site from the root URL.
  base: '/',
  build: {
    outDir: 'dist',
  },
})
