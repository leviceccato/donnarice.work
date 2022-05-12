<script lang="ts" setup>
import { computed } from 'vue'

const {
    tag = 'span',
    variant,
    color,
} = defineProps<{
    tag?: string
    variant:
        'body-small' |
        'body-medium' |
        'heading-small' |
        'heading-large'
    color?: string
}>()

const _variant = computed(() => {
    const values = variant.split('-')
    return {
        style: values[0],
        size: values[1],
    }
})
</script>

<template>
    <Component
        :is="tag"
        :class="[$style.root, $style[_variant.style], $style[_variant.size]]"
        :style="{ '--color': color }"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
.root {
    display: block;
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    color: var(--color, inherit);
    font-family: var(--font-interdisplay);
    &.body {
        &.small {
            font-size: 18px;
            line-height: 1.5;
            letter-spacing: 0.01em;
        }
        &.medium {
            font-size: 20px;
            line-height: 1.4;
            letter-spacing: 0.01em;
        }
    }
    &.heading {
        &.small {
            font-weight: 500;
            text-transform: uppercase;
            font-size: 16px;
            letter-spacing: 0.06em;
        }
        &.large {
            font-size: 40px;
            line-height: 1.3;
        }
    }
}
</style>