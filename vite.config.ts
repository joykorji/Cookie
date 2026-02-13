import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to '/YOUR_REPO_NAME/' and build; for Vercel/Netlify leave unset
  base: process.env.VITE_BASE || '/',
})
