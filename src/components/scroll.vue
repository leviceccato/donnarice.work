<script>
import { onBeforeUnmount, ref, watch } from 'vue'
import { textRotation, textSkew } from '../scripts/store.js'
import LocomotiveScroll from 'locomotive-scroll'
import debounce from 'lodash/debounce'

const setStyle = (property, value) => document.documentElement.style.setProperty(property, value)

export default {
    props: {
        el: { type: String, required: true }
    },
    setup(props) {
        const rotation = ref(0)

        watch(rotation, (to) => setStyle('--rotation', to))

        const updateScroll = debounce(() => window._scroll.update(), 100)

        window._scroll = new LocomotiveScroll({
            el: document.querySelector(props.el),
            smooth: true,
            getSpeed: true,
        })
        window.addEventListener('resize', updateScroll)
        window._scroll.on('scroll', ({ scroll, speed, limit }) => {
            const percentage = Math.abs(speed / limit.y)
            const offset = percentage * (limit.y * 0.0002)
            rotation.value += offset
            textRotation.value = Math.min(speed, 20)
            textSkew.value = Math.min(speed, 20)
        })

        onBeforeUnmount(() => window._scroll.destroy())
    }
}
</script>

<template />

<style lang="scss">
@use 'node_modules/locomotive-scroll/dist/locomotive-scroll.min.css';

.c-scrollbar {
    width: 10px;
    &:hover { transform: none; }
}
.c-scrollbar_thumb {
    z-index: 2;
    background-color: transparent;
    opacity: 1;
    margin: 0;
    width: 6px;
    margin: 2px;
    background-color: red;
}
</style>