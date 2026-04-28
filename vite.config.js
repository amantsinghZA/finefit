import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for Fine Fit website
// Deployed via Vercel - no special adapter needed
export default defineConfig({
  plugins: [react()],
})
