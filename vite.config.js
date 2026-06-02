import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Giữ nguyên để nhận diện đúng thư mục trên Netlify
  optimizeDeps: {
    exclude: [],
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    holdUntilCrawlEnd: true
  },
  build: {
    // Không dùng rollupOptions ép tên file nữa, để Vite tự sinh hash cho cả JS lẫn CSS đồng bộ
    polyfillModulePreload: false, // Chặn đứng lỗi MIME gốc trên Netlify
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: false,
    watch: false,
    cors: { origin: '*', credentials: true },
    allowedHosts: ['.modal.host', 'localhost', '127.0.0.1']
  }
})