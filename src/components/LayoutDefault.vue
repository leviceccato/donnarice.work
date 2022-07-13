<script lang="ts" setup>
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { createColor, mix } from '../scripts/color'
import { clamp } from '../scripts/util'
import type { Color } from '../scripts/color'
import type { NonEmptyArray } from '../scripts/util'

import Cursor from './Cursor.vue'
import Nav from './Nav.vue'

const { colors = [createColor('#EDEDED')], sections } = defineProps<{
    colors?: NonEmptyArray<Color>
    sections: NonEmptyArray<{
        href: string
        text: string
    }>
}>()

const main = ref<HTMLElement | null>(null)
const observers = ref<IntersectionObserver[]>([])
const animation = ref<'fade-up' | 'fade-down' | 'none'>('none')
const activeSection = ref(sections[0].href)

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

function setScroll(): void {
    const root = document.documentElement
    scroll.value = window.scrollY / (root.scrollHeight - root.clientHeight)
}

async function fadeToEl(href: string): Promise<void> {
    const el = document.querySelector(href)
    if (!el) return

    animation.value = 'fade-up'
    await nextTick()

    el.scrollIntoView()
}

function initObservers() {
    sections.forEach((section) => {
        const el = document.querySelector(`#${section.href}`)
        if (!el) return

        // Ensure visibility detection is independant of section height
        const threshold = clamp(0, window.innerHeight / 2 / el.clientHeight, 1)

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    activeSection.value = section.href
                }
            },
            { threshold },
        )

        observer.observe(el)
        observers.value.push(observer)
    })
}

onMounted(() => {
    window.addEventListener('scroll', setScroll)
    window.addEventListener('resize', initObservers)
})

defineExpose({ initObservers })
</script>

<template>
    <div :class="$style.root">
        <Cursor />
        <Nav
            :sections="sections"
            :active-section="activeSection"
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
