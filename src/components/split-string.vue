<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'nanostores/vue'
import { textRotation, textSkew } from '../scripts/store.js'
import { throttle } from 'lodash-es'

export default {
    props: {
        lines: { type: Array, default: () => [] }
    },
    setup(props) {
        const getTextRotation = useStore(textRotation)
        const getTextSkew = useStore(textSkew)

        const rotations = ref([]) 
        const skews = ref([])

        const lineData = computed(() => props.lines.map((line) => line.split('').map((char) => char === ' ' ? '&nbsp' : char)))
        const maxLineLength = computed(() => Math.max(...lineData.value.map(line => line.length)))
        
        const cycleArray = (array, to) => {
            if (array.value.length > maxLineLength.value) array.value.pop()
            throttle(() => array.value.unshift(to), 10)()
        }

        watch(getTextRotation, (to) => cycleArray(rotations, to))
        watch(getTextSkew, (to) => cycleArray(skews, to))

        return { lineData, rotations, skews }
    },
}
</script>

<template>
    <template v-for="line in lineData">
        <span
            class="char"
            v-for="(char, index) in line"
            :data-index="index" 
            :style="{
                transform: `
                    translateY(${((rotations[index] || 0) * 5) * -1}px)
                    rotateZ(${(rotations[index] || 0) * 1}deg)
                    skew(${(skews[index] || 0) * 1}deg)
                `
            }"
            v-html="char">
        </span>
        <br />
    </template>
</template>

<style lang="scss" scoped>
.char {
    display: inline-block;
}
</style>