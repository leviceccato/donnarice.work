<script setup>
import { computed } from 'vue'

const props = defineProps({
    crop: { type: [String, Array] },
    tag: { type: String, default: 'span' },
    isShown: { type: Boolean, default: false }
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
        :style="style"
        :class="[$style.text, {
            [$style.uppercase]: isUppercase,
            [$style.shown]: isShown
        }]"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
@use 'sass:math';

$count: 30;
$start: 0.15;
$frame: math.div(100, $count);
$increment: math.div($start, $count);

@keyframes bleedIn {
    @for $i from 0 through $count {
        #{($i * $frame) + '%'} {
            -webkit-text-stroke-width: #{$start - ($i * $increment)}em;
        }
    }
}

@keyframes bleedOut {
    @for $i from 0 through $count {
        #{($i * $frame) + '%'} {
            -webkit-text-stroke-width: #{$i * $increment}em;
        }
    }
}

.text {
    display: block;
    font-size: inherit;
    font-weight: inherit;
    margin: 0;

    animation-name: bleedOut;
    animation-duration: 550ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
    -webkit-text-stroke-color: var(--dynamic-background);

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

    &.shown {
        animation-name: bleedIn;
    }
}
</style>