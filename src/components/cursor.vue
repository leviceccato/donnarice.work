<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

const CURSOR_WIDTH = 4
const CURSOR_HEIGHT = 4
const RING_DEFAULT_WIDTH = 32
const RING_DEFAULT_HEIGHT = 32
const RING_STROKE_WIDTH = 2
const SMALL_DISTANCE = 0.1

const cursorX = ref(0)
const cursorY = ref(0)
const isCursorStopped = ref(true)

const ringX = ref(cursorX.value - (RING_DEFAULT_WIDTH / 2))
const ringY = ref(cursorY.value - (RING_DEFAULT_HEIGHT / 2))
const ringTargetX = ref<number | null>(cursorX.value - (RING_DEFAULT_WIDTH / 2))
const ringTargetY = ref<number | null>(cursorY.value - (RING_DEFAULT_HEIGHT / 2))

const ringWidth = ref(RING_DEFAULT_WIDTH)
const ringHeight = ref(RING_DEFAULT_HEIGHT)
const ringTargetWidth = ref(RING_DEFAULT_WIDTH)
const ringTargetHeight = ref(RING_DEFAULT_HEIGHT)

const ringLastDeltaX = ref(0)
const ringLastDeltaY = ref(0)

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

    const paddingX = Number(targetElement.dataset.cursorPaddingX) || 0
    const paddingY = Number(targetElement.dataset.cursorPaddingY) || 0
    const { width, height, top, left } = targetElement.getBoundingClientRect()

    const targetWidth = width + (paddingX * 2)
    const targetHeight = height + (paddingY * 2)

    ringTargetWidth.value = targetWidth - RING_STROKE_WIDTH
    ringTargetHeight.value = targetHeight - RING_STROKE_WIDTH
    ringTargetX.value = left + (targetWidth / 2) - paddingX - RING_STROKE_WIDTH
    ringTargetY.value = top + (targetHeight / 2) - paddingY - RING_STROKE_WIDTH
}

const throttledCheckForCursorElement = throttle(checkForCursorElement, 100)
const debounceResetRingSize = debounce(() => {
    resetRingSize()
    animateRing()
}, 300, {
    leading: true,
    trailing: false,
})

function drawRing(): boolean {
    if (!ctx.value) {
        return true
    }

    const targetX = ringTargetX.value ?? cursorX.value
    const targetY = ringTargetY.value ?? cursorY.value

    const deltaX = Math.abs(targetX - ringX.value)
    const deltaY = Math.abs(targetY - ringY.value)
    const deltaWidth = Math.abs(ringTargetWidth.value - ringWidth.value)
    const deltaHeight = Math.abs(ringTargetHeight.value - ringHeight.value)

    const isStoppingX = (deltaX < ringLastDeltaX.value) && (deltaX < SMALL_DISTANCE)
    const isStoppingY = (deltaY < ringLastDeltaY.value) && (deltaY < SMALL_DISTANCE)
    const isStoppingWidth = deltaWidth < SMALL_DISTANCE
    const isStoppingHeight = deltaHeight < SMALL_DISTANCE

    if (isStoppingX && isStoppingY && isStoppingWidth && isStoppingHeight) {
        return true
    }

    ctx.value.clearRect(0, 0, canvasWidth.value, canvasWidth.value)

    ringLastDeltaX.value = deltaX
    ringLastDeltaY.value = deltaY

    ringX.value += (targetX - ringX.value) * 0.15
    ringY.value += (targetY - ringY.value) * 0.15
    ringWidth.value += (ringTargetWidth.value - ringWidth.value) * 0.15
    ringHeight.value += (ringTargetHeight.value - ringHeight.value) * 0.15

    const radius = Math.min(ringWidth.value, ringHeight.value) / 2

    drawRoundedRect(ctx.value,
        ringX.value - (ringWidth.value / 2) + (CURSOR_WIDTH / 2),
        ringY.value - (ringHeight.value / 2) + (CURSOR_HEIGHT / 2),
        ringWidth.value,
        ringHeight.value,
        radius
    )

    ctx.value.lineWidth = RING_STROKE_WIDTH
    ctx.value.strokeStyle = 'rgba(0, 0, 0, 1)'
    ctx.value.stroke()

    return false
}

function animateRing(): void {
    if (!ctx.value) return

    isCursorStopped.value = drawRing()
    if (isCursorStopped.value) return

    window.requestAnimationFrame(animateRing)
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
    if (width < (2 * radius)) radius = width / 2
    if (height < (2 * radius)) radius = height / 2

    ctx.beginPath()

    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + width, y, radius)

    ctx.closePath()
}

onMounted(() => {
    ctx.value = canvas.value?.getContext('2d')

    setCanvasSize()

    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('scroll', debounceResetRingSize)
    window.addEventListener('mousemove', event => {
        setCursorCoords(event)

        if (isCursorStopped.value) {
            animateRing()
        }
    })
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
    width: 5px;
    height: 5px;
    border-radius: 1000px;
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