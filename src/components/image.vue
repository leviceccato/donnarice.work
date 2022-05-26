<script lang="ts" setup>
import { ref } from 'vue'

import Button from './button.vue'

const {
    src,
    alt = '',
} = defineProps<{
    src: string,
    alt?: string,
}>()

const scrollYCache = ref<number | null>(null)
const rootEl = ref<HTMLElement | null>(null)
const isZoomed = ref(false)

function toggleZoom(): void {
    if (!rootEl.value) return

    if (isZoomed.value) {
        return
    }
    
    scrollYCache.value = window.scrollY

    const rootRect = rootEl.value.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
}
</script>

<template>
    <div
        ref="root"
        :class="$style.root"
    >
        <Button
            :class="$style.toggleButton"
            aria-label="Toggle zoom"
            @click="toggleZoom"
        />
        <img
            :class="$style.image"
            :alt="alt"
            :src="src"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    background-color: var(--col-white);
    padding: 100px;
    position: relative;
}
.image {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 400px);
}
.toggleButton {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: red;
}
</style>