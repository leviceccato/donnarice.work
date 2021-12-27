<script setup>
import { computed } from 'vue'

const props = defineProps({
    crop: { type: [String, Array] }
})

const style = computed(() => {
    if (typeof props.crop === 'string') {
        if (props.crop === 'uppercase') {
            return {
                '--cap-height': '0.5',
                '--x-desc-height': '0.72'
            }
        }
    }

    // Array
    if (typeof props.crop === 'object') {
        return {
            '--cap-height': String(props.crop[0]),
            '--x-desc-height': String(props.crop[1])
        }
    }

    return {
        '--cap-height': '0.5',
        '--x-desc-height': '1.15'
    }
})
</script>

<template>
    <span
        :class="$style.text"
        :style="style"
    >
        <slot />
    </span>
</template>

<style lang="scss" module>
.text {
    display: block;
    &::before,
    &::after {
        content: '';
        display: block;
        height: 0;
        width: 0;
    }
    &::before {
        margin-top: calc((var(--cap-height, 0.5) - var(--line-height)) * 0.5em);
    }
    &::after {
        margin-bottom: calc((var(--x-desc-height, 0.72) - var(--line-height)) * 0.5em);
    }
}
</style>