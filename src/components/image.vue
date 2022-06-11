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
    <div :class="$style.root">
        <img
            ref="image"
            :class="$style.image"
            :alt="alt"
            :src="src"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    background-color: var(--col-white);
    padding: 30px;
}
.image.image {
    cursor: none;
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 400px);
}
</style>