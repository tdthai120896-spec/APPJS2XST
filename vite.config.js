import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ➔ THAY ĐỔI QUAN TRỌNG: Đổi từ './' thành '/' để ép mọi đường dẫn assets (JS/CSS) 
  // phải đi từ gốc tên miền của Netlify, giải quyết triệt để việc mất style/CSS.
  base: '/', 
  optimizeDeps: {
    // Exclude packages that shouldn't be pre-bundled
    exclude: [],
    // Entries point for dependency pre-bundling
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    // Hold the first optimizeDeps run until all dependencies are discovered
    holdUntilCrawlEnd: true
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: false,
    watch: false,
    cors: {
      origin: '*',
      credentials: true
    },
    allowedHosts: [
      '.modal.host',
      'localhost',
      '127.0.0.1'
    ]
  }
})