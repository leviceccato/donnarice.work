<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { provideScroll } from '../scripts/use-scroll'
import { createColor } from '../scripts/color'

import Nav from './nav.vue'

const colors = [
    createColor('#EDEDED'), // Grey
    createColor('#E1FAD8'), // Green
    createColor('#CFEEEE'), // Blue
    createColor('#F6E1E1'), // Red
]

const color = ref(colors[0])
const shouldTransitionColor = ref(false)

// Number between 0 and 1 to represent vertical scroll progress
const scroll = ref(0)

provideScroll(scroll)

function setScroll(): void {
    const distance = document.documentElement.scrollHeight - document.documentElement.clientHeight
    scroll.value = (window.scrollY / distance)
}

onMounted(() => {
    window.addEventListener('scroll', setScroll)
})
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <Nav :class="$style.nav" />
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
        @include util.vars-to-custom-props();
    }
}
.root {
    background-color: var(--background-color, var(--col-grey-1));
    min-height: 100vh;
    @include util.fluid(padding, 20px, 152px);
}
.nav {
    position: absolute;
    z-index: 1;
}
</style>