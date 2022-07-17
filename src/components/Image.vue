<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import createZoom from 'medium-zoom'
import type { Zoom } from 'medium-zoom'

const { src, alt = '' } = defineProps<{
    src: string
    alt?: string
}>()

const zoom = ref<Zoom>()
const isZoomed = ref(false)
const image = ref<HTMLElement | null>(null)

onMounted(() => {
    zoom.value = createZoom(image.value!, {
        margin: 20,
        background: 'var(--dynamic-color)',
    })
    zoom.value.on('open', () => (isZoomed.value = true))
    zoom.value.on('close', () => (isZoomed.value = false))
})
</script>

<template>
    <div
        :class="[$style.root, { [$style.zoomed]: isZoomed }]"
        data-cursor
        data-cursor-free
        data-cursor-padding-x="16"
        data-cursor-padding-y="16"
        @click="zoom?.open()"
    >
        <img
            ref="image"
            :class="$style.image"
            :alt="alt"
            :src="src"
        />
        <div
            :class="$style.overlay"
            @click="zoom?.close()"
        />
    </div>
</template>

<style lang="scss" module>
:global {
    .medium-zoom-image.medium-zoom-image {
        cursor: none;
    }
    .medium-zoom-overlay.medium-zoom-overlay {
        z-index: 1;
    }
    .medium-zoom--opened {
        .medium-zoom-overlay.medium-zoom-overlay {
            cursor: none;
        }
    }
    .medium-zoom-image--opened.medium-zoom-image--opened {
        z-index: 1;
    }
}
.root {
    background-color: rgba(0 0 0 / 0.05);
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.zoomed {
        .overlay {
            pointer-events: all;
        }
    }
}
.image.image {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 400px);
}
.overlay {
    z-index: 2;
    position: fixed;
    inset: 0;
    pointer-events: none;
}
</style>
