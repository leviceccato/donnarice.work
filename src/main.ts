import './styles/base.scss'

import { ViteSSG } from 'vite-ssg/single-page'

import App from './App.vue'
const components = import.meta.globEager('./components/**/*.vue')

export const createApp = ViteSSG(App, ({ app }) => {
    Object.entries(components).forEach(([path, Component]) => {
        const matches = path.match(/([\w\d_-]*)\.?[^\\\/]*$/i)
        if (matches) {
            app.component(matches[1], Component.default)
        }
    })
})
