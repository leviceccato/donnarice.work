<script>
import { computed } from 'vue'
import { useStore } from 'nanostores/vue'
import { textRotation, textSkew } from '../scripts/store.js'

export default {
    props: {
        lines: { type: Array, default: () => [] }
    },
    setup(props) {
        const getTextRotation = useStore(textRotation)
        const getTextSkew = useStore(textSkew)

        const splitLines = computed(() =>
            props.lines.map((line) =>
                line.split('').map((char) => char === ' ' ? '&nbsp' : char)
            )
        )

        const transformMap = computed(() => {
            const asd = splitLines.value.map((line, lineIndex) => {
                return line.map((char, charIndex) => {
                    return getTextRotation.value
                })
            })
            console.log(asd)
            return asd
        })
        

        return { splitLines, transformMap }
    },
}
</script>

<template>
    <template v-for="line in splitLines">
        <span
            class="char"
            v-for="(char, index) in line"
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