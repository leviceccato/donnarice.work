<script lang="ts" setup>
import { ref, computed, nextTick, watch } from 'vue'
import { createColor, mix } from '../scripts/color'
import { clamp } from '../scripts/util'
import type { Color } from '../scripts/color'
import type { NonEmptyArray } from '../scripts/util'

const NAV = [
    {
        href: 'intro',
        text: 'Intro',
    },
    {
        href: 'work',
        text: 'Work',
    },
    {
        href: 'kind-words',
        text: 'Kind words',
    },
]

const { colors = [createColor('#EDEDED')], headId } = defineProps<{
    colors?: NonEmptyArray<Color>
    headId?: string
}>()

const main = ref<HTMLElement | null>(null)
const observers = ref<IntersectionObserver[]>([])
const animation = ref<'fade-up' | 'fade-down' | 'none'>('none')
const activeIndex = ref(0)

// Number between 0 and 1 to represent vertical scroll progress
const scroll = ref(0)

// Interpolate color based on scroll and colors array
const color = computed(() => {
    const position = scroll.value * (colors.length - 1)
    const index = Math.min(Math.ceil(position), colors.length - 1)
    const previousIndex = Math.max(0, index - 1)
    const weight = index - position

    const color1 = colors[previousIndex]
    const color2 = colors[index]

    if (!color1 || !color2) return colors[0]

    return mix(colors[previousIndex], colors[index], weight)
})

const transition = computed(() => {
    if (animation.value !== 'none') {
        return 'background-color 500ms ease-in-out'
    }
    return 'none'
})

watch(scroll, (to) => {})

async function fadeToEl(href: string): Promise<void> {
    const el = document.querySelector(href)
    if (!el) return

    animation.value = 'fade-up'
    await nextTick()

    el.scrollIntoView()
}
</script>

<template>
    <div :class="$style.root">
        <Cursor />
        <Nav
            :nav-data="NAV"
            :active-index="activeIndex"
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
        scrollbar-width: none; // Hide scrollbar in Firefox
        // Hide scroll bar in other browsers
        &::-webkit-scrollbar {
            display: none;
        }
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
    min-height: 100vh;
}
.nav {
    position: fixed;
    z-index: 1;
    @include util.fluid(width, 100px, 300px);
    @include util.fluid(top left, 20px, 152px);
}
.main {
    @include util.fluid(padding-right, 20px, 152px);
    @include util.fluid(padding-left, 340px, 472px);
}
</style>
