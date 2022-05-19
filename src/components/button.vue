<script lang="ts" setup>
import { useAttrs, computed } from 'vue'

import Text from './text.vue'

const { href } = useAttrs()

const tag = computed(() => {
    if (href) {
        return 'a'
    }
    return 'button'
})

function handleClick(event: MouseEvent): void {
    // Safely access unknown attribute
    if (typeof href !== 'string') return
    
    // Handle non-hash links normally
    if (href[0] !== '#') return

    event.preventDefault()
    scrollToTarget(href)
}

function scrollToTarget(selector: string): void {
    document.querySelector(selector)
        ?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <Component
        :is="tag"
        :class="$style.root"
        @click="handleClick"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
.root {
    display: inline-flex;
    color: inherit;
    background: none;
    border: none;
    font-family: inherit;
    text-align: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    &:focus { outline: none; }
    &:focus-visible { box-shadow: 0px 0px 0px 2px currentColor; }
}
</style>