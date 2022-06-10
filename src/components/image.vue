<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import createZoom, { Zoom } from 'medium-zoom'

import Button from './button.vue'

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
    zoom.value.on('toggle', () => {
        console.log('tog')
    })
})

const asd = () => {
    zoom.value?.open()
}
</script>

<template>
    <div :class="$style.root">
        <img
            ref="image"
            :class="$style.image"
            :alt="alt"
            :src="src"
        />
        <Button
            :class="$style.toggleButton"
            aria-label="Toggle zoom"
            @click="asd"
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
    top: 100px;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: red;
}
</style>