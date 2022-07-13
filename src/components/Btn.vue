<script lang="ts" setup>
import { useAttrs, computed } from 'vue'

const { href } = useAttrs()

const tag = computed(() => {
    if (href) {
        return 'a'
    }
    return 'button'
})
</script>

<template>
    <Component
        :is="tag"
        :class="$style.root"
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
    &:focus {
        outline: none;
    }
    &:focus-visible {
        box-shadow: 0px 0px 0px 2px currentColor;
    }
}
</style>
