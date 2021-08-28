<script>
import { ref, computed, watch, onMounted } from 'vue'
import { throttle } from 'lodash-es'

const loadImage = ({ url }) => new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (error) => reject(error)
    image.src = url
})

const loadFont = ({ name, url, style = 'normal', weight }) => new Promise((resolve, reject) => {
    new FontFace(name, `url(${url})`, { style, weight }).load()
        .then((font) => resolve(font))
        .catch((error) => reject(error))
})

export default {
    props: {
        images: { type: Array, default: () => [] },
        fonts: { type: Array, default: () => [] },
    },
    setup(props) {

        let loadedAssets = ref([])
        let barOffsetPercentage = ref(0)

        const assetCount = computed(() => props.images.length + props.fonts.length)
        const areAssetsLoaded = computed(() => barOffsetPercentage.value === 100)

        const updateBarOffset = throttle((to) => {
            barOffsetPercentage.value = (to.length / assetCount.value) * 100
        }, 50)

        watch(() => [...loadedAssets.value], (to) => updateBarOffset(to))

        onMounted(() => {
            props.fonts.forEach((font) => loadFont(font)
                .then((font) => {
                    loadedAssets.value.push(font)
                    document.fonts.add(font)
                })
                .catch((error) => {
                    loadedAssets.value.push({})
                    console.error(error)
                }))
            props.images.forEach((image) => loadImage(image)
                .then((image) => loadedAssets.value.push(image))
                .catch((error) => {
                    loadedAssets.value.push({})
                    console.error(error)
                }))
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
    // Ease in  quint
    transition: transform 650ms cubic-bezier(0.83, 0, 0.17, 1);
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
    // Ease out cubic
    transition: transform 250ms cubic-bezier(0.33, 1, 0.68, 1);
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