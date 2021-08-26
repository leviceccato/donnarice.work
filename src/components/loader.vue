<script>
import { ref, computed, onMounted } from 'vue'

const loadImage = (url) => new Promise((resolve, reject) => {
    let image = new Image()
    image.onerror = (error) => reject(error)
    image.onload = () => resolve(image)
    image.src = url
})

export default {
    props: {
        imageUrls: { type: Array, default: () => [] },
    },
    setup(props) {

        let loadedImages = ref([])

        const barOffsetPercentage = computed(() => (loadedImages.value.length / props.imageUrls.length) * 100)
        const areImagesLoaded = computed(() => loadedImages.value.length === props.imageUrls.length)

        onMounted(() => {
            props.imageUrls.forEach((url) => {
                loadImage(url)
                    .then((image) => {
                        loadedImages.value.push(image)
                    })
                    .catch((error) => {
                        loadedImages.value.push({})
                        console.error(error)
                    })
            })
        })

        return { barOffsetPercentage, areImagesLoaded }
    },
}
</script>

<template>
    <div :class="['loader', areImagesLoaded && 'open']">
        <div class="slide top" />
        <div class="bar left" :style="{ transform: `translateX(-${barOffsetPercentage}%)` }" />
        <div class="bar right" :style="{ transform: `translateX(${barOffsetPercentage}%)` }" />
        <div class="slide bottom" />
    </div>
</template>

<style lang="scss" scoped>
.loader {
    position: fixed;
    z-index: 2;
}
.slide {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: var(--col-bg);
    height: calc(50% - 0.5px);
    &.top {
        top: 0;
    }
    &.bottom {
        bottom: 0;
    }
}
.bar {
    position: absolute;
    width: 50%;
    height: 1px;
    transition: transform 150ms;
    background-color: var(--col-bg);
    top: calc(50% - 0.5px);
    &.left {
        left: 0;
    }
    &.right {
        right: 0;
    }
}
</style>