<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import { provideScroll } from '../scripts/use-scroll'
import { createColor, mix, Color } from '../scripts/color'
import { NonEmptyArray } from '../scripts/utilities'

import Nav from './nav.vue'
import Cursor from './cursor.vue'

const {
    colors = [createColor('#EDEDED')],
} = defineProps<{
    colors?: NonEmptyArray<Color>
}>()

// Animation state for navigation
const animation = ref<'fade-up' | 'fade-down' | 'none'>('none')

// Number between 0 and 1 to represent vertical scroll progress
const scroll = ref(0)

provideScroll(scroll)

// Interpolate color based on scroll and colors array
const color = computed(() => {
    const position = scroll.value * (colors.length - 1)
    const index = Math.min(Math.ceil(position), colors.length - 1)
    const previousIndex = Math.max(0, index - 1)
    const weight = index - position

    return mix(colors[previousIndex], colors[index], weight)
})

const transition = computed(() => {
    if (animation.value !== 'none') {
        return 'background-color 500ms ease-in-out'
    }
    return 'none'
})

function setScroll(): void {
    const distance = document.documentElement.scrollHeight - document.documentElement.clientHeight

    scroll.value = (window.scrollY / distance)
}

async function fadeToEl(href: string): Promise<void> {
    const el = document.querySelector(href)
    if (!el) return

    animation.value = 'fade-up'
    await nextTick()

    el.scrollIntoView()
}

onMounted(() => {
    window.addEventListener('scroll', setScroll)
})
</script>

<template>
    <Cursor />
    <div
        :class="$style.root"
        ref="root"
    >
        <Nav
            :class="$style.nav"
            @navigate="fadeToEl"
        />
        <main :class="$style.main">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" module>
@use '../styles/base';
@use '../styles/util';

:global {
    html {
        @include util.vars-to-custom-props();
    }
    ::-moz-selection {
        color: v-bind(color);
        background-color: var(--col-black-1);
    } 
    ::selection {
        color: v-bind(color);
        background-color: var(--col-black-1);
    }
}
.root {
    --dynamic-color: v-bind(color);
    background-color: var(--dynamic-color);
    transition: v-bind(transition);
    height: 100vh;
    display: flex;
}
.nav {
    z-index: 1;
    box-sizing: content-box;
    @include util.fluid(width, 100px, 300px);
    @include util.fluid(padding-top padding-left, 20px, 152px);
}
.main {
    display: flex;
    flex-direction: column;
    @include util.fluid(gap, 20px, 152px);
    @include util.fluid(padding-top padding-right, 20px, 152px);
    overflow-y: scroll;
    scrollbar-width: none; // Hide scrollbar in Firefox
    // Hide scroll bar in other browsers
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>