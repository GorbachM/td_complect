import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/usr/src/app/src'
    }
  },
  build: {
    rollupOptions: {
      external: ['src/assets/anydo_104098.png']
    }
  }
})
