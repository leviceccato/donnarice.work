import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    root: 'src',
    publicDir: 'static',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    plugins: [vue({ reactivityTransform: true })],
    css: {
        modules: {
            generateScopedName: '[local]_[hash:base64:5]',
        },
    },
})
