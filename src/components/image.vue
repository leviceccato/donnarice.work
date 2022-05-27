<script lang="ts" setup>
import { ref } from 'vue'

import Button from './button.vue'

const {
    src,
    alt = '',
} = defineProps<{
    src: string
    alt?: string
}>()

const scrollYCache = ref<number | null>(null)
const root = ref<HTMLElement | null>(null)
const isZoomed = ref(false)
const zoom = ref<null | {
    isActive: boolean
    translateX: number
    translateY: number
    scaleX: number
    scaleY: number
}>(null)

function toggleZoom(): void {
    if (!root.value) return

    if (zoom.value) {
        return
    }
    
    scrollYCache.value = window.scrollY

    const rootRect = root.value.getBoundingClientRect()
    
    zoom.value = {
        isActive: false,
        translateX: rootRect.left,
        translateY: rootRect.top,
        scaleX: rootRect.width / window.innerWidth,
        scaleY: rootRect.height / window.innerHeight,
    }

    window.requestAnimationFrame(() => {
        if (zoom.value) {
            zoom.value.isActive = true
        }
    })
}
</script>

<template>
    <div
        ref="root"
        :class="[$style.root, {
            [$style.zoom]: Boolean(zoom),
            [$style.active]: Boolean(zoom?.isActive),
        }]"
    >
        <img
            :class="$style.image"
            :alt="alt"
            :src="src"
        />
        <div
            :class="$style.zoomRoot"
            aria-hidden
        >
            <img
                :class="$style.zoomImage"
                alt=""
                :src="src"
            />
        </div>
        <Button
            :class="$style.toggleButton"
            aria-label="Toggle zoom"
            @click="toggleZoom"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    background-color: var(--col-white);
    padding: 100px;
    position: relative;
    --translate-x: v-bind(zoom?.translateX);
    --translate-y: v-bind(zoom?.translateY);
    --scale-x: v-bind(zoom?.scaleX);
    --scale-y: v-bind(zoom?.scaleY);
    &.zoom {
        .zoomRoot {
            display: block;
            transition: transform 450ms ease-in-out;
            transform: 
                translateX(calc(var(--translate-x, 0) * 1px))
                translateY(calc(var(--translate-y, 0) * 1px))
                scaleX(var(--scale-x, 1))
                scaleY(var(--scale-y, 1));
        }
    }
    &.active {
        .zoomRoot {
            transform: none;
        }
    }
}
.image {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 400px);
}
.toggleButton {
    position: absolute;
    top: 100px;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: red;
}
.zoomRoot {
    position: fixed;
    transform-origin: top left;
    background-color: var(--col-white);
    padding: 100px;
    display: none;
    inset: 0;
}
</style>