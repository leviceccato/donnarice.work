<script>
import { computed, watch, ref, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'nanostores/vue'
import { textRotation } from '../scripts/store.js'
import { throttle, memoize } from 'lodash-es'

const getOpposedLine = memoize((pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX),
    }
})

const getControlPoint = (current, previous, next, reverse) => {
    const _previous = previous || current
    const _next = next || current
    const smoothing = 0.2
    const opposedLine = getOpposedLine(_previous, _next) 
    const angle = opposedLine.angle + (reverse ? Math.PI : 0)
    const length = opposedLine.length * smoothing
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
}

const createBezierCurve = memoize((point, index, array) => {
    const [cpStartX, cpStartY] = getControlPoint(array[index - 1], array[index - 2], point)
    const [cpEndX, cpEndY] = getControlPoint(point, array[index - 1], array[index + 1], true)
    return `C ${cpStartX}, ${cpStartY} ${cpEndX}, ${cpEndY} ${point[0]}, ${point[1]}`
})

let observer
if (!import.meta.env.SSR) {
    observer = new IntersectionObserver((entries) => 
        entries.forEach(entry => {
            console.log(entry)
            entry.target._component.proxy.inViewport = entry.isIntersecting
        })
    )
}

export default {
    props: {
        lines: { type: Array, default: () => [] },
        hasUnderline: { type: Boolean, default: false },
    },
    setup(props) {
        const getTextRotation = useStore(textRotation)

        const rotations = ref([])
        const root = ref(null)
        const inViewport = ref(false)

        const lineData = computed(() => props.lines.map((line) => line.split('').map((char) => char === ' ' ? '&nbsp' : char)))
        const maxLineLength = computed(() => Math.max(...lineData.value.map(line => line.length)))

        const underlinePoints = computed(() => {
            if (!props.hasUnderline) return []
            return lineData.value.map((line) => {
                const length = line.length + 1
                return Array.from({ length }).map((_, index) => [
                    (index / (length - 1)) * 100,
                    ((rotations.value[index] || 0) * -5) + 50
                ])
            })
        })

        const underlinePaths = computed(() => underlinePoints.value.map((points) =>
            points.reduce((result, point, index) => index === 0
                ? `M ${point[0]}, ${point[1]}`
                : `${result} ${createBezierCurve(point, index, points)}`
            , '')
        )) 

        const cycleArray = (array, to) => {
            if (array.value.length > maxLineLength.value) array.value.pop()
            array.value.unshift(to)
        }

        watch(getTextRotation, (to) => requestAnimationFrame(() => cycleArray(rotations, to)))

        onMounted(() => {
            if (!import.meta.env.SSR) {
                root.value._component = getCurrentInstance()
                observer.observe(root.value)
            }
        })
 
        return { lineData, rotations, underlinePaths, inViewport, root }
    },
}
</script>

<template>
    <span class="split-string" ref="root">
        <template v-for="(line, lineIndex) in lineData">
            <span class="line">
                <span
                    class="char"
                    v-for="(char, charIndex) in line"
                    :key="charIndex"
                    :style="inViewport && {
                        transform: `
                            translateY(${(rotations[charIndex] || 0) * -5}px)
                            rotateZ(${rotations[charIndex] || 0}deg)
                            skew(${rotations[charIndex] || 0}deg)
                        `
                    }"
                    v-html="char">
                </span>
                <svg
                    v-if="hasUnderline"
                    v-show="inViewport"
                    class="underline"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none">
                    <path 
                        class="underline-path"
                        :d="underlinePaths[lineIndex]"
                    />
                </svg>
            </span>
            <br />
        </template>
    </span>
</template>

<style lang="scss" scoped>
.line {
    display: inline-block;
    position: relative;
}
.underline {
    position: absolute;
    left: 0;
    bottom: -0.15em;
    width: 100%;
    height: 2em;
    transform: translateY(50%);
}
.underline-path {
    stroke: var(--col-fg);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
    fill: none;
}
.char {
    display: inline-block;
}
</style>