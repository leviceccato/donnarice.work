export type PageProps = {}

export type PageContext = {
    Page: any
    pageProps?: PageProps
    documentProps?: {
        title?: string
        description?: string
    }
    urlPathname?: string
}
