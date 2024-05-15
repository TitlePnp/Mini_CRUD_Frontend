// vite.config.electron.ts
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: false,
  build: {
    ssr: 'src-electron/main.ts'
  }
})