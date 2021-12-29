<script setup>
import { computed } from 'vue'

const props = defineProps({
    crop: { type: [String, Array] },
    tag: { type: String, default: 'span' }
})

const isUppercase = computed(() => props.crop === 'uppercase')

const style = computed(() => {
    let result = {
        '--cap-height': '0.5',
        '--x-desc-height': '1.15'
    }

    if (isUppercase.value) {
        result['--cap-height'] = '0.5'
        result['--x-desc-height'] = '0.72'
    }

    if (Array.isArray(props.crop)) {
        result['--cap-height'] = String(props.crop[0])
        result['--x-desc-height'] = String(props.crop[1])
    }

    return result
})
</script>

<template>
    <Component
        :is="props.tag"
        :class="[$style.text, { [$style.uppercase]: isUppercase }]"
        :style="style"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
.text {
    display: block;
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    &::before,
    &::after {
        content: '';
        display: block;
        height: 0;
        width: 0;
    }
    &::before {
        margin-top: calc((var(--cap-height) - var(--line-height)) * 0.5em);
    }
    &::after {
        margin-bottom: calc((var(--x-desc-height) - var(--line-height)) * 0.5em);
    }
    &.uppercase {
        text-transform: uppercase;
    }
}
</style>