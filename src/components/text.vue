<script setup>
import { computed, provide, ref, watch } from 'vue'
import { animate, easeInOutSine } from '../scripts/animation.js'

const props = defineProps({
    crop: { type: [String, Array] },
    tag: { type: String, default: 'span' },
    isShown: { type: Boolean, default: false }
})

const emit = defineEmits(['aftershown'])

const isUppercase = computed(() => props.crop === 'uppercase')

const cropProps = computed(() => {
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

const isTextShown = computed(() => props.isShown)
provide('isTextShown', isTextShown)

const maxStroke = 0.15
const minStroke = 0
const strokeAnimDuration = 550

const strokeWidth = ref(maxStroke)

watch(() => props.isShown, async isShown => {
    await animate(
        strokeWidth.value,
        isShown ? minStroke : maxStroke,
        strokeAnimDuration,
        easeInOutSine,
        width => strokeWidth.value = width
    )
    emit('aftershown')

})
</script>

<template>
    <Component
        :is="props.tag"
        :style="{
            ...cropProps,
            '-webkit-text-stroke-width': `${strokeWidth}em`
        }"
        :class="[$style.text, {
            [$style.uppercase]: isUppercase
        }]"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
@use 'sass:math';

.text {
    display: block;
    font-size: inherit;
    font-weight: inherit;
    margin: 0;

    -webkit-text-stroke-color: var(--dynamic-background);
    // Required for this to look good for some reason
    opacity: 1;
    filter: blur(0px);

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