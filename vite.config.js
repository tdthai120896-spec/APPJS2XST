import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Giữ nguyên đường dẫn tương đối để chạy tốt trên cả Netlify và GitHub
  base: './', 
  optimizeDeps: {
    exclude: [],
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    holdUntilCrawlEnd: true
  },
  build: {
    // ➔ CHỐT HẠ 1: Tắt module preload để không bị lỗi MIME type trên Netlify
    polyfillModulePreload: false,
    // ➔ CHỐT HẠ 2: Xóa bỏ hoàn toàn phần ép tên file thủ công (rollupOptions) cũ 
    // Để Vite tự động quản lý xuất file JS/CSS đồng bộ 100%, không lo mất giao diện
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