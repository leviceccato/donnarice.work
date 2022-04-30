import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from '@/renderer/app'
import logoUrl from '@/static/logo.svg'

export const passToClient = ['pageProps', 'render', 'effect', 'state', '_']

export const render = async pageContext => {
    const app = createApp(pageContext)
    const appHtml = await renderToString(app)

    const { documentProps } = pageContext
    const title = (documentProps && documentProps.title) || 'Vite SSR app'
    const description = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

    const documentHtml = escapeInject`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <link rel="icon" href="${logoUrl}" />
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
