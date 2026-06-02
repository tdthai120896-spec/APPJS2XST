import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Giữ nguyên đường dẫn tương đối để chạy được cả Github Pages và Netlify
  base: './', 
  optimizeDeps: {
    exclude: [],
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    holdUntilCrawlEnd: true
  },
  build: {
    // ➔ CHỐT HẠ: Tắt tính năng tự động chèn mã Polyfill cho Module (Nguyên nhân chính gây lỗi MIME trên Netlify)
    polyfillModulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Gom gọn gàng để tránh lỗi nhận diện file nhị phân
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        // Ép định dạng đầu ra là 'iife' hoặc 'es' nhưng không tự phán đoán MIME
        format: 'es'
      }
    }
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