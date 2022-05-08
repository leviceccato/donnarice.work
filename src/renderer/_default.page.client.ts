import { App } from 'vue'
import { createApp } from './app'
import { PageContext } from './types' 
import { useClientRouter } from 'vite-plugin-ssr/client/router'

let _app: {
    app: App<Element>,
    changePage: (ctx: PageContext) => void,
}

const { hydrationPromise } = useClientRouter({
    ensureHydration: true,
    render(ctx) {
        if (!_app) {
            _app = createApp(ctx)
            _app.app.mount('#app')
        } else {
            _app.changePage(ctx)
        }
    }
})

hydrationPromise.then(() => console.log('Hydration finished, page is now interactive'));