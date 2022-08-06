<script lang="ts" setup>
import { computed } from 'vue'

const {
    tag = 'span',
    variant,
    color,
} = defineProps<{
    tag?: string
    variant:
        | 'body-xsmall'
        | 'body-small'
        | 'body-medium'
        | 'heading-small'
        | 'heading-large'
        | 'heading-label'
        | 'heading-button'
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
@use '../styles/util';

.root {
    display: block;
    font-size: inherit;
    font-weight: 400;
    color: var(--color, inherit);
    font-family: var(--font-interdisplay);
    &.body {
        &.xsmall {
            line-height: 1.5;
            @include util.fluid(font-size, 14px, 16px);
        }
        &.small {
            line-height: 1.5;
            letter-spacing: 0.01em;
            @include util.fluid(font-size, 16px, 18px);
        }
        &.medium {
            line-height: 1.4;
            letter-spacing: 0.01em;
            @include util.fluid(font-size, 17px, 20px);
        }
    }
    &.heading {
        &.button {
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            line-height: 1;
            @include util.fluid(font-size, 13px, 16px);
        }
        &.small {
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            line-height: 1.1;
            @include util.fluid(font-size, 13px, 16px);
        }
        &.label {
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            @include util.fluid(font-size, 8px, 12px);
        }
        &.large {
            line-height: 1.3;
            @include util.fluid(font-size, 28px, 40px);
        }
    }
}
</style>
