import { inject, provide, InjectionKey, Ref } from 'vue'

const key: InjectionKey<Ref<number>> = Symbol()

export const useScroll = () => {
    return inject(key)
}

export const provideScroll = (scroll: Ref<number>) => {
    provide(key, scroll)
}
