<script setup>
import { onMounted, reactive, ref } from 'vue'

const colours = [
    [237, 237, 237],
    [225, 250, 216],
    [207, 238, 238],
    [246, 225, 225]
]

const mixRgb = (rgb1, rgb2, weight = 0.5) => {
    const w = weight * 2 - 1;
    const w1 = (w + 1) / 2.0;
    const w2 = 1 - w1;
    return [
        Math.round(rgb1[0] * w1 + rgb2[0] * w2),
        Math.round(rgb1[1] * w1 + rgb2[1] * w2),
        Math.round(rgb1[2] * w1 + rgb2[2] * w2)
    ];
};

const background = ref(null)

const state = reactive({
    colour: undefined,
    scrollTotal: 1
})

const setColour = () => {
    const position = background.value.scrollTop / state.scrollTotal
    const relativePosition = position * colours.length
    const index = Math.min(colours.length - 1, Math.ceil(relativePosition))
    const previousIndex = Math.max(0, index - 1)
    const colour = colours[index]
    const previousColour = colours[previousIndex]
    const weight = index - relativePosition

    state.colour = mixRgb(previousColour, colour, weight)
}

const setScrollTotal = () => {
    state.scrollTotal = background.value.scrollHeight - background.value.clientHeight
}

onMounted(() => {
    setScrollTotal()
    setColour()
    window.addEventListener('resize', setScrollTotal)
    background.value.addEventListener('scroll', setColour)
})
</script>

<template>
    <div
        ref="background"
        :class="$style.background"
        :style="{ '--dynamic-background': `rgba(${state.colour})` }"
    >
        <slot />
    </div>
</template>

<style lang="scss" module>
.background {
    height: 100%;
    background-color: var(--dynamic-background);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        border: solid 3px transparent;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 0 4px currentColor;
        border: solid 2px transparent;
        background-color: var(--dynamic-background);
        background-clip: content-box;
        border-radius: 10px;
        &:hover {
            border: none;
        }
    }
}
</style>