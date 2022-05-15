<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)

function setCursorCoords(event: MouseEvent): void {
    x.value = event.clientX
    y.value = event.clientY
}

onMounted(() => {
    window.addEventListener('mousemove', setCursorCoords)
})
</script>

<template>
    <div :class="$style.root" />
</template>

<style lang="scss" module>
.root {
    position: fixed;
    transform: translate(v-bind(x), v-bind(y));
}
</style>