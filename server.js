const express = require('express')
const { createServer } = require('vite')
const { createPageRenderer } = require('vite-plugin-ssr')

const root = __dirname
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

const start = async () => {
    const app = express()

    let viteDevServer
    if (isProduction) {
        app.use(express.static(`${root}/dist/client`))
    } else {
        viteDevServer = await createServer({
            root,
            server: { middlewareMode: 'ssr' }
        })
        app.use(viteDevServer.middlewares)
    }

    const renderPage = createPageRenderer({ viteDevServer, isProduction, root })

    app.get('*', async (req, res, next) => {
        const { httpResponse } = await renderPage({ url: req.originalUrl })
        if (!httpResponse) return next()

        res
            .status(httpResponse.statusCode)
            .type(httpResponse.contentType)
            .send(httpResponse.body)
    })
    
    app.listen(port)
    console.log(`Server running at http://localhost:${port}`)
}

start()
