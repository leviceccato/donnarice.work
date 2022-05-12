import { inject, App, InjectionKey } from 'vue'
import { PageContext } from '../renderer/types'

const key: InjectionKey<PageContext> = Symbol()

export const usePageContext = () => {
    return inject(key)
}

export const setPageContext = (app: App, pageContext: PageContext) => {
    app.provide(key, pageContext)
}