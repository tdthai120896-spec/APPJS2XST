import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  optimizeDeps: {
    exclude: [],
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    holdUntilCrawlEnd: true
  },
  build: {
    // Ép mọi thứ xuất ra chuẩn chỉ, không băm nhỏ file tùy tiện
    cssCodeSplit: false, 
    rollupOptions: {
      output: {
        // Gom toàn bộ code JS vào đúng 1 file index duy nhất để loại bỏ hoàn toàn rủi ro MIME
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
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