<script setup>
import { computed, ref, inject, defineProps } from 'vue'

const props = defineProps({
    text: { type: String, default: '' }
})

const isTextShown = inject('isTextShown', false)

const hoveredIndex = ref(-1)

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
        const offset = Math.abs(hoveredIndex.value - index)
        return offset * 50
    })
})
</script>

<template>
    <span :class="$style.segments">
        <span
            v-for="segment, index in segments"
            :key="index"
            :class="[$style.segment, { [$style.hidden]: !isTextShown }]"
            v-html="segment"
            :style="{ transitionDelay: `${delays[index]}ms` }"
            @mouseover="hoveredIndex = index"
        />
    </span>
</template>

<style lang="scss" module>
.segments {
    &:hover {
        .segment {
            text-shadow:
                -1px 0 0 currentColor,
                0 -1px 0 currentColor,
                1px 0 0 currentColor,
                0 1px 0 currentColor;

            &.hidden {
                text-shadow: none;
            }
        }
    }
}

.segment {
    transition: text-shadow 350ms ease;
    display: inline-block;
    text-shadow:
        -1px 0 0 transparent,
        0 -1px 0 transparent,
        1px 0 0 transparent,
        0 1px 0 transparent;

    &.hidden {
        transition: none;
    }
}
</style>