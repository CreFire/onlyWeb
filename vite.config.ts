import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { fileURLToPath } from 'url'
import electron from 'vite-plugin-electron/simple'
import renderer from 'vite-plugin-electron-renderer'

// 解决 ES module 没有 __dirname 的问题
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    renderer(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: { build: { outDir: 'dist-electron' } },
      },
      preload: {
        input: { preload: 'electron/preload.ts' },
        vite: { build: { outDir: 'dist-electron' } },
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: { outDir: 'dist' },
})
