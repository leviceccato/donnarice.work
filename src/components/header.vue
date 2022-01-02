<script setup>
import { reactive, inject, computed, ref, watch } from 'vue'
import { animate, easeInOutSine } from '../scripts/animation.js'
import { debounce } from '../scripts/async.js'

import ButtonReset from './button-reset.vue'
import MediaQuery from './media-query.vue'
import Link from './link.vue'
import Text from './text.vue'
import FloodText from './flood-text.vue'

const links = [
    { text: 'Intro', id: 'intro' },
    { text: 'Work', id: 'work' },
    { text: 'Testimonials', id: 'testimonials' },
    { text: 'Resume', id: 'resume' },
    { text: 'Contact', id: 'contact' }
]

const state = reactive({
    isNavOpen: false,
    isNavTextShown: false
})

const toggleNav = () => {
    if (!state.isNavOpen) {
        state.isNavOpen = true
        state.isNavTextShown = true
        return
    }

    state.isNavTextShown = false
}

const isReady = inject('isReady', false)

const setIsNavOpen = () => {
    if (state.isNavTextShown) return

    state.isNavOpen = false
}

const scrollContext = inject('scrollContext', null)

const currentSection = computed(() => {
    if (!scrollContext.value) return null
    return scrollContext.value.currentSection.value
})

const maxOffset = 10
const slideDuration = 250

const visualSection = ref(links[0].id)
const linkOffset = ref(0)
const linkScaleY = ref(1)

watch(currentSection, debounce(250, async (newSection, currentSection) => {
    if (!currentSection) return
    if (!newSection) return

    let currentIndex = 0
    let newIndex = 0
    links.forEach((link, index) => {
        switch (link.id) {
            case currentSection:
                currentIndex = index
                return
            case newSection:
                newIndex = index
        }
    })

    let newOffset = 0
    if (newIndex > currentIndex) {
        newOffset = maxOffset
    } else if (newIndex < currentIndex) {
        newOffset = -maxOffset
    }

    animate(1, 0, slideDuration, easeInOutSine, scaleY => {
        linkScaleY.value = scaleY
    })
    await animate(0, newOffset, slideDuration, easeInOutSine, offset => {
        linkOffset.value = offset
    })
    visualSection.value = newSection
    animate(0, 1, slideDuration, easeInOutSine, scaleY => {
        linkScaleY.value = scaleY
    })
    animate(newOffset * -1, 0, slideDuration, easeInOutSine, offset => {
        linkOffset.value = offset
    })
}))
</script>

<template>
    <MediaQuery query="(min-width: 768px)" v-slot="{ isMatching }">
        <div role="banner" :class="$style.header">
            <ButtonReset
                :class="$style.button"
                @click="toggleNav"
            >
                <Text
                    :is-shown="isReady"
                    crop="uppercase"
                >
                    <FloodText :text="state.isNavOpen ? 'Close menu' : 'Open menu'" />
                </Text>
            </ButtonReset>
            <nav :class="[$style.nav, { [$style.open]: state.isNavOpen }]">
                <div
                    v-for="link, index in links"
                    :key="index"
                    :class="$style.linkWrapper"
                >
                    <Link
                        :class="$style.link"
                        :href="`#${link.id}`"
                        is-virtual
                        @follow="toggleNav"
                    >
                        <Text
                            :is-shown="state.isNavTextShown || isMatching"
                            crop="uppercase"
                            @animationend="setIsNavOpen"
                        >
                            <FloodText :text="link.text" />
                        </Text>
                    </Link>
                    <span
                        :style="{
                            transform: `translateX(${linkOffset}px) scaleY(${linkScaleY})`
                        }"
                        :class="[$style.linkLine, {
                            [$style.shown]: isReady,
                            [$style.active]: link.id === visualSection
                        }]"
                    />
                </div>
            </nav>
        </div>
    </MediaQuery>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

.header {
    padding: 0.3em;
    padding-right: calc(0.1em + 8px);
    display: flex;
    flex-direction: column;
    font-size: 30px;
    align-items: flex-end;
    position: fixed;
    width: 100%;
    pointer-events: none;
    z-index: 1;
}

@include spec('.button', 2) {
    padding: 0.2em;
    margin: -0.2em;
    overflow: hidden;
    pointer-events: all;

    @include media(m) {
        display: none;
    }
}

.nav {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.4em;
    pointer-events: none;

    @include media(m) {
        display: flex;
        flex-direction: row;
        margin-top: 0;
    }

    &.open {
        display: flex;
    }
}

@include spec('.link', 2) {
    overflow: hidden;
    pointer-events: all;
}

.linkWrapper {
    display: flex;
    position: relative;

    &:not(:first-of-type) {
        margin-top: 0.4em;

        @include media(m) {
            margin-top: 0;
        }
    }
}

.container {
    overflow: hidden;
}

.main {
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    &.scrollingDown {
        animation-name: move;
        animation-direction: normal;
    }

    &.scrollingUp {
        animation-name: move;
        animation-direction: reverse;
    }
}

.linkLine {
    position: absolute;
    left: 0;
    bottom: -0.25em;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    display: none;
    opacity: 0;
    transition: opacity 750ms ease 100ms;

    &.shown {
        opacity: 1;
    }

    &.active {
        @include media(m) {
            display: block;
        }
    }
}
</style>