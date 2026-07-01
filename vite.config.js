import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  base: '/', 
  optimizeDeps: {
    exclude: [],
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    holdUntilCrawlEnd: true
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    // 🛠️ THAY ĐỔI TẠI ĐÂY:
    hmr: true, // Bật lại Hot Module Replacement
    watch: {
      usePolling: true, // Bật lại chế độ theo dõi file (Polling giúp nhận diện lệnh Save tốt hơn trên môi trường ảo)
      interval: 100,    // Tốc độ quét file (100ms) giúp máy phản hồi cực nhanh
    },
    cors: { origin: '*', credentials: true },
    allowedHosts: ['.modal.host', 'localhost', '127.0.0.1']
  }
})