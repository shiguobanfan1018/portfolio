import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        /* GSAP 单独成块：换内容时它不变，可以长期吃缓存 */
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
})
