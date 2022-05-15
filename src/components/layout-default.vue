<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { provideScroll } from '../scripts/use-scroll'
import { createColor, mix } from '../scripts/color'

import Nav from './nav.vue'

const colors = [
    createColor('#EDEDED'), // Grey
    createColor('#E1FAD8'), // Green
    createColor('#CFEEEE'), // Blue
    createColor('#F6E1E1'), // Red
    createColor('#EDEDED'), // Grey
]

const shouldTransitionColor = ref(false)

// Number between 0 and 1 to represent vertical scroll progress
const scroll = ref(0)

provideScroll(scroll)

// Interpolate color based on scroll and colors array
const color = computed(() => {
    const position = scroll.value * (colors.length - 1)
    const index = Math.ceil(position)
    const previousIndex = Math.max(0, index - 1)
    const weight = index - position

    return mix(colors[previousIndex], colors[index], weight)
})

const transition = computed(() => {
    if (shouldTransitionColor.value) {
        return 'background-color 500ms ease-in-out'
    }
    return 'none'
})

function setScroll(): void {
    const distance = document.documentElement.scrollHeight - document.documentElement.clientHeight

    scroll.value = (window.scrollY / distance)
}

function fadeToEl(href: string): void {
    const el = document.querySelector(href)
    if (!el) return

    el.scrollIntoView()
}

onMounted(() => {
    window.addEventListener('scroll', setScroll)
})
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <Nav
                :class="$style.nav"
                @navigate="fadeToEl"
            />
            <main :class="$style.main">
                <slot />
            </main>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '../styles/base';
@use '../styles/util';

:global {
    html {
        scrollbar-width: none; // Hide scrollbar in Firefox
        @include util.vars-to-custom-props();
        // Hide scroll bar in other browsers
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
.root {
    background-color: v-bind(color);
    transition: v-bind(transition);
    min-height: 100vh;
    @include util.fluid(padding, 20px, 152px);
}
.nav {
    position: absolute;
    z-index: 1;
}
</style>