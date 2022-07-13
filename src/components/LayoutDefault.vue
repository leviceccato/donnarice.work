<script lang="ts" setup>
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { createColor, mix } from '../scripts/color'
import { clamp, sleep } from '../scripts/util'
import type { Color } from '../scripts/color'
import type { NonEmptyArray } from '../scripts/util'

import Cursor from './Cursor.vue'
import Nav from './Nav.vue'

const FADE_TO_EL_DURATION = 300

const { colors = [createColor('#EDEDED')], sections } = defineProps<{
    colors?: NonEmptyArray<Color>
    sections: NonEmptyArray<{
        href: string
        text: string
    }>
}>()

const main = ref<HTMLElement | null>(null)
const observers = ref<IntersectionObserver[]>([])
const animation = ref<'fadeUp' | 'fadeDown' | 'none'>('none')
const activeSection = ref(sections[0].href)
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

function setScroll(): void {
    const root = document.documentElement
    scroll.value = window.scrollY / (root.scrollHeight - root.clientHeight)
}

async function fadeToEl(data: {
    href: string
    from: number
    to: number
}): Promise<void> {
    const el = document.querySelector(`#${data.href}`)
    if (!el) return

    const isDown = data.to > data.from

    animation.value = isDown ? 'fadeUp' : 'fadeDown'
    await sleep(FADE_TO_EL_DURATION)

    el.scrollIntoView()
    animation.value = 'none'
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
    isMounted.value = true
    window.addEventListener('scroll', setScroll)
    window.addEventListener('resize', initObservers)
})

defineExpose({ initObservers })
</script>

<template>
    <div
        :class="[
            $style.root,
            $style[animation],
            { [$style.mounted]: isMounted },
        ]"
    >
        <div :class="$style.overlay" />
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
    position: relative;
    background-color: var(--dynamic-color);
    min-height: 100vh;
    &.mounted {
        .overlay {
            opacity: 0;
        }
    }
    &.fadeDown {
        .main {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    &.fadeUp {
        .main {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
}
.overlay {
    z-index: 2;
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: opacity 1000ms ease 200ms;
    background-color: var(--dynamic-color);
}
.nav {
    position: fixed;
    z-index: 1;
    @include util.fluid(width, 100px, 300px);
    @include util.fluid(top left, 20px, 152px);
}
.main {
    transition: opacity calc(v-bind(FADE_TO_EL_DURATION) * 1ms),
        transform calc(v-bind(FADE_TO_EL_DURATION) * 1ms);
    @include util.fluid(padding-right, 20px, 152px);
    @include util.fluid(padding-left, 340px, 472px);
}
</style>
