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
    polyfillModulePreload: false,
    // ➔ Đổi lại thành true để Tailwind CSS được bóc tách và nạp riêng biệt chính xác
    cssCodeSplit: true, 
    rollupOptions: {
      output: {
        // Cấu hình xuất file thông minh: JS vào assets, CSS vào đúng vị trí của nó
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
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
    cors: { origin: '*', credentials: true },
    allowedHosts: ['.modal.host', 'localhost', '127.0.0.1']
  }
})