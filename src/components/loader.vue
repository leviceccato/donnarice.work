<script>
import { ref, computed, onMounted } from 'vue'

const loadImage = (url) => new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (error) => reject(error)
    image.src = url
})

const loadFont = ({ name, url, style, weight }) => new Promise((resolve, reject) => {
    new FontFace(name, `url(${url})`, { style, weight }).load()
        .then((font) => resolve(font))
        .catch((error) => reject(error))
})

export default {
    props: {
        imageUrls: { type: Array, default: () => [] },
        fonts: { type: Array, default: () => ({}) },
    },
    setup(props) {

        let loadedAssets = ref([])

        const assetCount = computed(() => props.imageUrls.length + props.fonts.length)
        const barOffsetPercentage = computed(() => (loadedAssets.value.length / assetCount.value) * 100)
        const areAssetsLoaded = computed(() => loadedAssets.value.length === assetCount.value)

        onMounted(() => {
            props.imageUrls.forEach((url) =>
                loadImage(url)
                    .then((image) => loadedAssets.value.push(image))
                    .catch((error) => {
                        loadedAssets.value.push({})
                        console.error(error)
                    })
            )
            props.fonts.forEach((font) =>
                loadFont(font)
                    .then((font) => loadedAssets.value.push(font))
                    .catch((error) => {
                        loadedAssets.value.push({})
                        console.error(error)
                    })
            )
        })

        return { barOffsetPercentage, areAssetsLoaded }
    },
}
</script>

<template>
<div :class="['loader', areAssetsLoaded && 'open']">
    <div class="slide top" />
    <div class="bar left" :style="{ transform: `translateX(-${barOffsetPercentage}%)` }" />
    <div class="bar right" :style="{ transform: `translateX(${barOffsetPercentage}%)` }" />
    <div class="slide bottom" />
</div>
</template>

<style lang="scss" scoped>
.loader {
    pointer-events: none;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0; 
    bottom: 0;
    &.open {
        .slide {
            &.top {
                transform: translateY(-100%);
            }
            &.bottom {
                transform: translateY(100%);
            }
        }
    }
}
.slide {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: var(--col-fg);
    height: calc(50% - 0.5px);
    transition: transform 650ms cubic-bezier(0.83, 0, 0.17, 1); // Ease in  quint 
    transition-delay: 450ms;
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
    background-color: var(--col-fg);
    top: calc(50% - 0.5px);
    &.left {
        left: 0;
    }
    &.right {
        right: 0;
    }
}
</style>