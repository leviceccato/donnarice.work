import { createApp } from '@/renderer/app'
import { useClientRouter } from 'vite-plugin-ssr/client/router'

let app

const { hydrationPromise } = useClientRouter({
    ensureHydration: true,
    render(ctx) {
        if (!app) {
            app = createApp(ctx)
            app.mount('#app')
        } else {
            app.changePage(ctx)
        }
    }
})

hydrationPromise.then(() => console.log('Hydration finished, page is now interactive'));