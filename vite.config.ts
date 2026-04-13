import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves project sites from a subpath; using a relative base
  // keeps asset URLs working regardless of the repo name.
  base: './',
  plugins: [react()],
})
