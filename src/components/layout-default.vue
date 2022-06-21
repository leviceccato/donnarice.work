<script lang="ts" setup>
import { onMounted, ref, computed, nextTick, watch, onBeforeUnmount } from 'vue'
import { createColor, mix, Color } from '../scripts/color'
import { NonEmptyArray, clamp } from '../scripts/utilities'

import Nav from './nav.vue'
import Cursor from './cursor.vue'

const SCROLL_TOP_PADDING = 100
const NAV = [
    {
        href: 'intro',
        text: 'Intro'
    },
    {
        href: 'work',
        text: 'Work'
    },
    {
        href: 'kind-words',
        text: 'Kind words'
    },
]

const {
    colors = [createColor('#EDEDED')],
    headId,
} = defineProps<{
    colors?: NonEmptyArray<Color>
    headId?: string
}>()

const main = ref<HTMLElement | null>(null)
const observers = ref<IntersectionObserver[]>([])
const animation = ref<'fade-up' | 'fade-down' | 'none'>('none')
const activeIndex = ref(0)
const mountedSectionCount = ref(0)
const isMounted = ref(false)

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

watch(mountedSectionCount, to => {
    // Include duplicated head section
    if (to >= NAV.length + 1) {
        initObservers()
    }
})

watch(scroll, to => {
    
})

// Allow looping scroll from top or bottom of document
function setScroll(): void {
    const root = document.documentElement
    const maxScroll = root.scrollHeight - root.clientHeight

    if (window.scrollY < SCROLL_TOP_PADDING) {
        window.scroll({ top: root.scrollHeight })
    } else if (window.scrollY === maxScroll) {
        window.scroll({ top: SCROLL_TOP_PADDING })
    }

    scroll.value = window.scrollY / maxScroll
}

async function fadeToEl(href: string): Promise<void> {
    const el = document.querySelector(href)
    if (!el) return

    animation.value = 'fade-up'
    await nextTick()

    el.scrollIntoView()
}

// Detect active section
function initObservers(): void {
    NAV.forEach((item, index) => {
        if (!item.href) return

        const el = document.querySelector(`[data-section-id=${item.href}]`)
        if (!el) return console.log(item.href)

        // Ensure visibility detection is independant of section height
        const threshold = clamp(0, (window.innerHeight / el.clientHeight) / 2, 1)

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {                
                console.log(index)
                activeIndex.value = index
            }
        }, { threshold })

        observer.observe(el)
        observers.value.push(observer)
    })
}

function trackSectionMount(): void {
    mountedSectionCount.value++
}

onMounted(() => {
    isMounted.value = true
    window.scroll({ top: SCROLL_TOP_PADDING })
    window.addEventListener('scroll', setScroll)
    window.addEventListener('resize', initObservers)
})

onBeforeUnmount(() => {
    observers.value.forEach(observer => {
        observer.disconnect()
    })
    window.removeEventListener('scroll', setScroll)
    window.removeEventListener('resize', initObservers)
})
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
            <div :class="$style.scrollPadder" />
            <div :id="headId">
                <slot name="head" v-bind="{ trackSectionMount }" />
            </div>
            <slot name="tail" v-bind="{ trackSectionMount }" />
            <div :class="$style.scrollPadder" />
            <slot name="head" v-bind="{ trackSectionMount }" />
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
.scrollPadder {
    height: calc(v-bind(SCROLL_TOP_PADDING) * 1px);
}
</style>