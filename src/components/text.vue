<script setup>
import { computed, provide } from 'vue'

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

const isTextShown = computed(() => props.isShown)
provide('isTextShown', isTextShown)
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

$fade-iterations: 10;
$bleed-iterations: 20;
$total-iterations: $fade-iterations + $bleed-iterations;

$max-width: 0.15;
$max-opacity: 1;
$max-blur: 0.15;

$frame-percentage: math.div(100, $total-iterations);
$stroke-increment: math.div($max-width, $bleed-iterations);

@keyframes bleedIn {
    @for $i from 0 through $fade-iterations {
        #{($i * $frame-percentage) + '%'} {
            -webkit-text-stroke-width: #{$max-width}em;
            opacity: 1;
            filter: blur(0px);
        }
    }
    @for $i from $fade-iterations through $total-iterations {
        $count: $i - $fade-iterations;
        #{($i * $frame-percentage) + '%'} {
            -webkit-text-stroke-width: #{$max-width - ($count * $stroke-increment)}em;
            opacity: 1;
            filter: blur(0px);
        }
    }
}

@keyframes bleedOut {
    @for $i from 0 through $bleed-iterations {
        #{($i * $frame-percentage) + '%'} {
            -webkit-text-stroke-width: #{$i * $stroke-increment}em;
            opacity: 1;
            filter: blur(0px);
        }
    }
    @for $i from $bleed-iterations through $total-iterations {
        #{($i * $frame-percentage) + '%'} {
            -webkit-text-stroke-width: #{$max-width}em;
            opacity: 1;
            filter: blur(0px);
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