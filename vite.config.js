import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // use relative paths so it works on GitHub Pages
  base: './',
  // build directly into /docs for GitHub Pages
  build: {
    outDir: 'docs',
  },
})