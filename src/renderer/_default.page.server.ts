import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from '../renderer/app'
import { PageContext } from './types'

export const passToClient = ['pageProps', 'render', 'effect', 'state', '_']

export const render = async (ctx: PageContext) => {
    const app = createApp(ctx)
    const appHtml = await renderToString(app)

    const { documentProps } = ctx
    const title = documentProps?.title || 'Donna Rice'
    const description = documentProps?.description || 'The work of Donna Rice, a draftsperson and senior PA from Newcastle, Australia'

    const documentHtml = escapeInject`
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <link rel="icon" href="/logo.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="${description}" />
                <title>${title}</title>
            </head>
            <body>
                <div id="app">${dangerouslySkipEscape(appHtml)}</div>
            </body>
        </html>
    `

    return { documentHtml }
}
