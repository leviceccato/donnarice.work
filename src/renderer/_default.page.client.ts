import { App } from 'vue'
import { createApp, SSRApp } from './app'
import { PageContext } from './types' 
import { useClientRouter } from 'vite-plugin-ssr/client/router'

let app: SSRApp

const { hydrationPromise } = useClientRouter({
    ensureHydration: true,
    prefetchLinks: true,
    render(ctx) {
        if (!app) {
            app = createApp(ctx)
            app.mount('#app')
        } else {
            app.changePage?.(ctx)
        }
    }
})

hydrationPromise.then(() => console.log('Hydration finished, page is now interactive'));