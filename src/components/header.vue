<script setup>
import { reactive } from 'vue'

import ButtonReset from './button-reset.vue'
import Link from './link.vue'
import Text from './text.vue'
import FloodText from './flood-text.vue'

const links = [
    { text: 'Intro', url: '#intro' },
    { text: 'Work', url: '#work' },
    { text: 'Testimonials', url: '#testimonials' },
    { text: 'Resume', url: '#resume' },
    { text: 'Contact', url: '#contact' }
]

const state = reactive({
    isNavOpen: false
})
</script>

<template>
    <div role="banner" :class="$style.header">
        <ButtonReset
            :class="$style.button"
            @click="state.isNavOpen = !state.isNavOpen"
        >
            <Text crop="uppercase">
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
                    :href="link.url"
                >
                    <Text crop="uppercase">
                        <FloodText :text="link.text" />
                    </Text>
                </Link>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

.header {
    padding: 0.3em;
    display: flex;
    flex-direction: column;
    font-size: 30px;
    align-items: flex-end;
    position: fixed;
    width: 100%;
}
@include spec('.button', 2) {
    padding: 0.2em;
    margin: -0.2em;
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
    @include media(m) {
        display: flex;
        flex-direction: row;
    }
    &.open {
        display: flex;
    }
}
.linkWrapper {
    display: flex;
    margin-top: 0.4em;
    @include media(m) {
        margin-top: 0;
    }
}
</style>