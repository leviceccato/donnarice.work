<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import createZoom, { Zoom } from 'medium-zoom'

const {
    src,
    alt = '',
} = defineProps<{
    src: string
    alt?: string
}>()

const zoom = ref<Zoom>()
const image = ref<HTMLElement | null>(null)

onMounted(() => {
    zoom.value = createZoom(image.value!)
})
</script>

<template>
    <div
        :class="$style.root"
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
    .medium-zoom-image--opened.medium-zoom-image--opened {
        z-index: 1;
    }
}
.root {
    background-color: var(--col-white);
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.image.image {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 400px);
}
</style>