<script setup>
import { reactive, inject, computed } from 'vue'

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
const nextSection = ref(null)

const nextSectionDirection = computed(() => {
    if (!nextSection.value) return 'none'
    if (!currentSection.value) return 'none'

    let nextIndex = 0
    let currentIndex = 0
    links.forEach((link, index) => {
        if (link.id === nextIndex.value) {
            nextIndex = index
            return
        }
        if (link.id === currentIndex.value) {
            currentIndex = index
        }
    })

    if (nextIndex === currentIndex) return 'none'
    if (nextIndex > currentIndex) return 'right'
    return 'left'
})
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
                    v-for="link in links"
                    :key="link"
                    :class="$style.linkWrapper"
                >
                    <Link
                        :class="$style.link"
                        :href="`#${link.id}`"
                        is-virtual
                        @follow="
                            toggleNav();
                            nextSection = link.id
                        "
                    >
                        <Text
                            :is-shown="state.isNavTextShown || isMatching"
                            crop="uppercase"
                            @animationend="setIsNavOpen"
                        >
                            <FloodText :text="link.text" />
                        </Text>
                    </Link>
                    <span :class="[$style.linkLine, {
                        [$style.active]: link.id === currentSection
                    }]" />
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

.linkLine {
    position: absolute;
    left: 0;
    bottom: -0.3em;
    width: 100%;
    height: 2px;
    transition: transform 250ms ease;
    background-color: currentColor;
    transform: scaleY(0);

    &.active {
        transform: scaleY(1);
    }
}
</style>