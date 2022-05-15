<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const WIDTH = 24
const HEIGHT = 24

const x = ref(0)
const y = ref(0)

function setCursorCoords(event: MouseEvent): void {
    x.value = event.clientX - (WIDTH / 2)
    y.value = event.clientY - (HEIGHT / 2)
}

onMounted(() => {
    window.addEventListener('mousemove', setCursorCoords)
})
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.overlay" />
    </div>
</template>

<style lang="scss" module>
:global {
    * {
        cursor: none;
    }
}
.root {
    pointer-events: none;
    position: fixed;
    width: calc(v-bind(WIDTH) * 1px);
    height: calc(v-bind(HEIGHT) * 1px);
    z-index: 2;
    background-color: currentColor;
    border-radius: 1000px;
    filter: invert(1);
    mix-blend-mode: difference;
    transform: translate(calc(v-bind(x) * 1px), calc(v-bind(y) * 1px));
}
.overlay {
    position: absolute;
    inset: 0;
    border-radius: 1000px;
    background-color: currentColor;
    mix-blend-mode: hue;
}
</style>