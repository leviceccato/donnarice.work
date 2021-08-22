<script>
import { onBeforeUnmount } from 'vue'
import { setScroll, rotation, setRotation } from '../scripts/store.js'
import { getValue } from 'nanostores'
import createRolly from 'rolly.js'

export default {
    props: {
        view: { type: String, required: true }
    },
    setup(props) {
        const rolly = createRolly({
            view: document.querySelector(props.view),
            native: true,
            change(scroll) {
                const offset = Math.abs((scroll.current / scroll.bounding) - (scroll.previous / scroll.bounding))
                const relativeOffset = offset * (scroll.bounding * 0.0002)
                setRotation(getValue(rotation) + relativeOffset)
                setScroll(scroll.current / scroll.bounding)
            }
        })

        rolly.init()
        onBeforeUnmount(() => rolly.destroy())
    }
}
</script>

<template />

<style>
.is-virtual-scroll {
    overflow: hidden;
}
.is-native-scroll.y-scroll {
    overflow-y: scroll;
    overflow-x: hidden;
}
.is-native-scroll.x-scroll {
    overflow-y: hidden;
    overflow-x: scroll;
}
.rolly-view {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: auto;
    margin: auto;
}
.rolly-scroll-bar {
    display: block;
    position: absolute;
    transition: transform 0.6s ease-out;
    background: #efefef;
}
.rolly-scroll-bar.is-hidden {
    display: none;
}
.rolly-scroll-bar.y-scroll {
    top: 0;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 100%;
    transform: scaleX(0.5);
    transform-origin: right;
}
.rolly-scroll-bar.x-scroll {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 12px;
    transform: scaleY(0.5);
    transform-origin: bottom;
}
.is-dragging-scroll-bar .rolly-scroll-bar,
.rolly-scroll-bar:hover {
    transform: none;
}
.rolly-scroll-bar-thumb {
    width: 100%;
    height: auto;
    background: #ccc;
}
.rolly-scroll-view {
    position: absolute;
    top: 0;
    width: 1px;
}
</style>