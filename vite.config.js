import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 🛠️ FIX 1: Đổi sang './' (đường dẫn tương đối) giúp dự án chạy được ở bất kỳ hosting nào (Netlify, Vercel, GitHub) mà không bị trắng trang
  base: './', 
  optimizeDeps: {
    // Exclude packages that shouldn't be pre-bundled
    exclude: [],
    // Entries point for dependency pre-bundling
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    // Hold the first optimizeDeps run until all dependencies are discovered
    holdUntilCrawlEnd: true
  },
  build: {
    // 🛠️ FIX 2: Ép Rollup xuất file kèm định dạng .js rõ ràng để trình duyệt không hiểu lầm thành "application/octet-stream"
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
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