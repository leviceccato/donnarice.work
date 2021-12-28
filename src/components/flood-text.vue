<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
    text: { type: String, default: '' }
})

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
            :class="$style.segment"
            v-html="segment"
            :style="{ transitionDelay: `${delays[index]}ms` }"
            @mouseover="state.hoveredIndex = index"
        />
    </span>
</template>

<style lang="scss" module>
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
    transition: text-shadow 350ms ease;
    display: inline-block;
}
</style>