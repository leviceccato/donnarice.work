<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import throttle from 'lodash/throttle'

const CURSOR_WIDTH = 4
const CURSOR_HEIGHT = 4

const RING_DEFAULT_WIDTH = 32
const RING_DEFAULT_HEIGHT = 32

const cursorX = ref(0)
const cursorY = ref(0)

const ringTargetX = ref<number | null>(cursorX.value - (RING_DEFAULT_WIDTH / 2))
const ringTargetY = ref<number | null>(cursorY.value - (RING_DEFAULT_HEIGHT / 2))
const ringX = ref(cursorX.value - (RING_DEFAULT_WIDTH / 2))
const ringY = ref(cursorY.value - (RING_DEFAULT_HEIGHT / 2))
const ringTargetWidth = ref(RING_DEFAULT_WIDTH)
const ringTargetHeight = ref(RING_DEFAULT_HEIGHT)
const ringWidth = ref(RING_DEFAULT_WIDTH)
const ringHeight = ref(RING_DEFAULT_HEIGHT)

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>()
const canvasWidth = ref(1)
const canvasHeight = ref(1)

function setCanvasSize(): void {
    if (!canvas.value) return

    canvas.value.width = window.innerWidth
    canvasWidth.value = window.innerWidth
    canvas.value.height = window.innerHeight
    canvasHeight.value = window.innerHeight
}

function resetRingSize(): void {
    ringTargetWidth.value = RING_DEFAULT_WIDTH
    ringTargetHeight.value = RING_DEFAULT_HEIGHT

    ringTargetX.value = null
    ringTargetY.value = null
}

function setCursorCoords(event: MouseEvent): void {
    cursorX.value = event.clientX
    cursorY.value = event.clientY

    throttledCheckForCursorElement(cursorX.value, cursorY.value)
}

function checkForCursorElement(x: number, y: number): void {
    const element = document.elementFromPoint(x, y)
    if (!element || !(element instanceof HTMLElement)) {
        return resetRingSize()
    }
    
    const targetElement = element.dataset.cursor
        ? element
        : element.closest('[data-cursor]')
    if (!targetElement || !(targetElement instanceof HTMLElement)) {
        return resetRingSize()
    }

    const offset = Number(targetElement.dataset.cursor) || 0
    const { width, height, top, left } = targetElement.getBoundingClientRect()

    const targetWidth = width + (offset * 2)
    const targetHeight = height + (offset * 2)

    ringTargetWidth.value = targetWidth
    ringTargetHeight.value = targetHeight
    ringTargetX.value = left + (targetWidth / 2) - offset
    ringTargetY.value = top + (targetHeight / 2) - offset
}

const throttledCheckForCursorElement = throttle(checkForCursorElement, 100)

function drawRing(): void {
    if (!ctx.value) return

    ctx.value.beginPath()

    const targetX = ringTargetX.value ?? cursorX.value
    const targetY = ringTargetY.value ?? cursorY.value

    ringX.value += (targetX - ringX.value) * 0.15
    ringY.value += (targetY - ringY.value) * 0.15
    ringWidth.value += (ringTargetWidth.value - ringWidth.value) * 0.15
    ringHeight.value += (ringTargetHeight.value - ringHeight.value) * 0.15

    ctx.value.rect(
        ringX.value - (ringWidth.value / 2) + (CURSOR_WIDTH / 2),
        ringY.value - (ringHeight.value / 2) + (CURSOR_HEIGHT / 2),
        ringWidth.value,
        ringHeight.value,
    )
    ctx.value.lineWidth = 2
    ctx.value.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.value.stroke()
}

function animateRing(): void {
    if (!ctx.value) return

    ctx.value.clearRect(0, 0, canvasWidth.value, canvasWidth.value)
    drawRing()
    requestAnimationFrame(animateRing)
}

onMounted(() => {
    ctx.value = canvas.value?.getContext('2d')

    animateRing()
    setCanvasSize()

    window.addEventListener('mousemove', setCursorCoords)
    window.addEventListener('resize', setCanvasSize)
})
</script>

<template>
    <div>
        <div :class="$style.cursor" />
        <canvas
            ref="canvas"
            :class="$style.canvas"
        />
    </div>
</template>

<style lang="scss" module>
:global {
    * {
        cursor: none;
    }
}
.cursor {
    position: fixed;
    filter: invert(1);
    mix-blend-mode: difference;
    transform: translate(calc(v-bind(cursorX) * 1px), calc(v-bind(cursorY) * 1px));
    pointer-events: none;
    z-index: 2;
    width: 4px;
    height: 4px;
    background-color: currentColor;
}
.canvas {
    pointer-events: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    filter: invert(1);
    mix-blend-mode: difference;
}
</style>