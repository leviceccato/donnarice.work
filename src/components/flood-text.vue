<script setup>
import { computed, reactive, inject } from 'vue'

const props = defineProps({
    text: { type: String, default: '' }
})

const isReady = inject('isReady', false)

const state = reactive({
    hoveredIndex: -1
})

const segments = computed(() => {
    return props.text.split('').map(char => {
        if (char === ' ') {
            char = '&nbsp;'
        }
        return char
    })
})

const delays = computed(() => {
    return segments.value.map((_, index) => {
        const offset = Math.abs(state.hoveredIndex - index)
        return offset * 50
    })
})
</script>

<template>
    <span :class="$style.segments">
        <span
            v-for="segment, index in segments"
            :key="index"
            :class="[$style.segment, { [$style.ready]: isReady }]"
            v-html="segment"
            :style="{ transitionDelay: `${delays[index]}ms` }"
            @mouseover="state.hoveredIndex = index"
        />
    </span>
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

.segments {
    &:hover {
        .segment {
            text-shadow:
                -0.6px 0px 0 currentColor,
                0px -0.6px 0 currentColor,
                0.6px 0px 0 currentColor,
                0px 0.6px 0 currentColor;
        }
    }
}

.segment {
    animation-name: bleedIn;
    animation-duration: 550ms;
    animation-timing-function: ease;
    animation-fill-mode: both;
    animation-play-state: paused;
    -webkit-text-stroke-color: var(--dynamic-background);
    transition: text-shadow 350ms ease;
    display: inline-block;
    &.ready {
        animation-play-state: running;
    }
}
</style>