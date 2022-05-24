import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { resolve } from 'path'

export default defineConfig({
    clearScreen: false,
    publicDir: 'src/static',
    plugins: [
        vue({ reactivityTransform: true }),
        ssr(),
    ],
})