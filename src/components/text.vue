<script setup>
import { computed, useCssModule } from 'vue'

const $style = useCssModule()

const props = defineProps({
    crop: { type: [String, Array] }
})

const bind = computed(() => {
    let result = {
        class: [$style.text],
        style: {
            '--cap-height': '0.5',
            '--x-desc-height': '1.15'
        }
    }

    if (props.crop === 'uppercase') {
        result.class = [...result.class, $style.uppercase]
        result.style['--cap-height'] = '0.5'
        result.style['--x-desc-height'] = '0.72'
    }

    if (Array.isArray(props.crop)) {
        result.style['--cap-height'] = String(props.crop[0])
        result.style['--x-desc-height'] = String(props.crop[1])
    }

    return result
})
</script>

<template>
    <span v-bind="bind">
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