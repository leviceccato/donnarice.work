<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import createZoom from 'medium-zoom'
import type { Zoom } from 'medium-zoom'

import RatioContainer from './RatioContainer.vue'

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
    <RatioContainer
        :class="[$style.root, { [$style.zoomed]: isZoomed }]"
        :ratio="4 / 3"
        data-cursor
        data-cursor-free
        data-cursor-padding-x="16"
        data-cursor-padding-y="16"
        @click="zoom?.open()"
    >
        <div :class="$style.container">
            <img
                ref="image"
                :class="$style.image"
                :alt="alt"
                :src="src"
            />
        </div>
        <div
            :class="$style.overlay"
            @click="zoom?.close()"
        />
    </RatioContainer>
</template>

<style lang="scss" module>
@use '../styles/util';

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
    position: relative;
    &.zoomed {
        .overlay {
            pointer-events: all;
        }
    }
}
.container {
    position: absolute;
    inset: 40px;
    @include util.media(s) {
        @include util.fluid(inset, 15px, 30px);
    }
}
.image.image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.overlay {
    z-index: 2;
    position: fixed;
    inset: 0;
    pointer-events: none;
}
</style>
