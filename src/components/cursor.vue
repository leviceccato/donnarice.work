<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'

const CURSOR_WIDTH = 4
const CURSOR_HEIGHT = 4

const RING_WIDTH = 32
const RING_HEIGHT = 32

const cursorX = ref(0)
const cursorY = ref(0)

const ringX = ref(cursorX.value - (RING_WIDTH / 2))
const ringY = ref(cursorY.value - (RING_HEIGHT / 2))

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D>()
const canvasWidth = ref(1)
const canvasHeight = ref(1)

function setCanvasSize(): void {
    if (!canvas.value) return

    canvas.value.width = window.innerWidth
    canvasWidth.value = window.innerWidth

    canvas.value.height = window.innerHeight
    canvasHeight.value = window.innerHeight
}

function setCursorCoords(event: MouseEvent): void {
    cursorX.value = event.clientX
    cursorY.value = event.clientY
}

function drawRing(): void {
    if (!ctx.value) return

    ctx.value.beginPath()

    ringX.value += (cursorX.value - ringX.value) * 0.15
    ringY.value += (cursorY.value - ringY.value) * 0.15

    ctx.value.rect(
        ringX.value - (RING_WIDTH / 2) + (CURSOR_WIDTH / 2),
        ringY.value - (RING_HEIGHT / 2) + (CURSOR_HEIGHT / 2),
        RING_WIDTH,
        RING_HEIGHT,
    )
    ctx.value.lineWidth = 2
    ctx.value.strokeStyle = '#000000'
    ctx.value.stroke()
}

function animateRing(): void {
    if (!ctx.value) return

    ctx.value.clearRect(0, 0, canvasWidth.value, canvasWidth.value)
    drawRing()
    requestAnimationFrame(animateRing)
}

onMounted(() => {
    ctx.value = canvas.value?.getContext('2d') || undefined
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