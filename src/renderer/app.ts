import { createSSRApp, h, markRaw, reactive, App, defineComponent, Component } from 'vue'
import PageShell from '../components/page-shell.vue'
import { setPageContext } from '../scripts/use-page-context'
import { PageContext } from './types'

export type SSRApp = App<Element> & { changePage?: (ctx: PageContext) => void }

export const createApp = (ctx: PageContext): App<Element> & {} => {
    let reactiveCtx = reactive(ctx)

    let rootComponent: Component
    const component = defineComponent({
        data: () => ({
            Page: markRaw(ctx.Page),
            pageProps: markRaw(ctx.pageProps || {})
        }),
        render() {
            return h(PageShell, {}, {
                default: () => h(this.Page, this.pageProps)
            })
        },
        created() {
            rootComponent = this
        }
    })

    const app: SSRApp = createSSRApp(component)

    app.changePage = (ctx: PageContext) => {
        Object.assign(reactiveCtx, ctx)
        ;(rootComponent as typeof component).Page = markRaw(ctx.Page)
        ;(rootComponent as typeof component).pageProps = markRaw(ctx.pageProps || {})
    }

    setPageContext(app, reactiveCtx)

    return app
}
