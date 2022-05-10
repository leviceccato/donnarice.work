<script lang="ts" setup>
import { computed } from 'vue'

const {
    tag = 'span',
    variant = 'body',
} = defineProps<{
    tag?: string
    variant?: 'body' | 'heading-xlarge' | 'heading-large',
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
}
</style>