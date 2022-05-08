import { createSSRApp, h, markRaw, reactive, App, Component } from 'vue'
import PageShell from '../components/page-shell.vue'
import { setPageContext } from '../scripts/use-page-context'
import { PageContext } from './types'

export const createApp = (ctx: PageContext): { app: App<Element>, changePage: (ctx: PageContext) => void } => {
    let reactiveCtx = reactive(ctx)

    const component: Component = {
        data: () => ({
            Page: markRaw(ctx.Page),
            pageProps: markRaw(ctx.pageProps || {})
        }),
        render() {
            return h(PageShell, {}, {
                default: () => h(this.Page, this.pageProps)
            })
        },
        changePage(ctx: PageContext) {
            Object.assign(reactiveCtx, ctx)
            this.Page = markRaw(ctx.Page)
            this.pageProps = markRaw(ctx.pageProps || {})
        }
    }

    const app = createSSRApp(component)

    setPageContext(app, reactiveCtx)

    return { app, changePage: component.changePage }
}
