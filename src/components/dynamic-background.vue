<script setup>
import { onMounted, reactive, ref, provide, computed } from 'vue'
import { animate, easeInOutSine } from '../scripts/animation.js'
import { sleep } from '../scripts/async.js'

const colours = [
    [237, 237, 237],
    [225, 250, 216],
    [207, 238, 238],
    [246, 225, 225]
]

const mixRgb = (rgb1, rgb2, weight = 0.5) => {
    const w = weight * 2 - 1
    const w1 = (w + 1) / 2.0
    const w2 = 1 - w1
    return [
        Math.round(rgb1[0] * w1 + rgb2[0] * w2),
        Math.round(rgb1[1] * w1 + rgb2[1] * w2),
        Math.round(rgb1[2] * w1 + rgb2[2] * w2)
    ]
}

const scrollDuration = 1100

const background = ref(null)
const scrolling = ref('none')
const isTransitioning = ref(false)

const state = reactive({
    colour: colours[0],
    scrollTotal: 1
})

const getColour = scrollTop => {
    const position = scrollTop / state.scrollTotal
    const relativePosition = position * colours.length

    const index = Math.min(colours.length - 1, Math.ceil(relativePosition))
    const previousIndex = Math.max(0, index - 1)

    const colour = colours[index]
    const previousColour = colours[previousIndex]

    const weight = index - relativePosition

    return mixRgb(previousColour, colour, weight)
}

const scrollTo = async selector => {
    const targetEl = background.value.querySelector(selector)
    if (!targetEl) return

    scrolling.value = targetEl.offsetTop >= background.value.scrollTop
        ? 'down'
        : 'up'
    isTransitioning.value = true

    const fromColour = getColour(background.value.scrollTop)
    const toColour = getColour(targetEl.offsetTop)
    animate(0, 1, scrollDuration, easeInOutSine, weight => {
        state.colour = mixRgb(fromColour, toColour, weight)
    })
    await sleep(scrollDuration / 2)

    background.value.scrollTo(0, targetEl.offsetTop)
    scrolling.value = 'none'
    await sleep(scrollDuration / 2)

    isTransitioning.value = false
}

const scrollContext = computed(() => {
    if (!background.value) return null

    return { scrolling, scrollTo }
})

provide('scrollContext', scrollContext)

const setScrollTotal = () => {
    if (!background.value) return

    state.scrollTotal = background.value.scrollHeight - background.value.clientHeight
}

onMounted(() => {
    setScrollTotal()
    state.colour = getColour(background.value.scrollTop)

    window.addEventListener('resize', setScrollTotal)
    background.value.addEventListener('scroll', () => {
        if (isTransitioning.value) return

        state.colour = getColour(background.value.scrollTop)
    })
})
</script>

<template>
    <div
        ref="background"
        :class="$style.background"
        :style="{
            '--dynamic-background': `rgba(${state.colour})`
        }"
    >
        <slot v-bind="{ scrolling, scrollDuration }" />
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
    }
}
</style>