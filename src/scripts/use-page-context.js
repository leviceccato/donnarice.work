import { inject } from 'vue'

const key = Symbol()

export const usePageContext = () => {
    return inject(key)
}

export const setPageContext = (app, pageContext) => {
    app.provide(key, pageContext)
}
