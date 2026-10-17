import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages project sites are served under /<repository-name>/
  base: '/Portfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
})
