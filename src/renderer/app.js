import { createSSRApp, h, markRaw, reactive } from 'vue'
import PageShell from '@/components/page-shell.vue'
import { setPageContext } from '@/scripts/use-page-context'

export const createApp = ctx => {
    let root
    let reactiveCtx = reactive(ctx)

    let app = createSSRApp({
        data: () => ({
            Page: markRaw(ctx.Page),
            pageProps: markRaw(ctx.pageProps || {})
        }),
        created() {
            root = this
        },
        render() {
            return h(PageShell, {}, {
                default: () => h(this.Page, this.pageProps)
            })
        }
    })

    app.changePage = ctx => {
        Object.assign(reactiveCtx, ctx)
        root.Page = markRaw(ctx.Page)
        root.pageProps = markRaw(ctx.pageProps || {})
    }

    setPageContext(app, reactiveCtx)

    return app
}
