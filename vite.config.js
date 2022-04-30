import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { resolve } from 'path'

export default {
    plugins: [vue(), ssr()],
    clearScreen: false,
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
}