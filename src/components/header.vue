<script setup>
import { reactive } from 'vue'

import ButtonReset from './button-reset.vue'

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
            {{ state.isNavOpen ? 'Close menu' : 'Open menu' }}
        </ButtonReset>
        <nav :class="[$style.nav, { [$style.open]: state.isNavOpen }]">
            <a
                :class="$style.link"
                href="#intro"
            >
                Intro
            </a>
            <a
                :class="$style.link"
                href="#work"
            >
                Work
            </a>
            <a
                :class="$style.link"
                href="#testimonials"
            >
                Testimonials
            </a>
            <a
                :class="$style.link"
                href="#resume"
            >
                Resume
            </a>
            <a
                :class="$style.link"
                href="#contact"
            >
                Contact
            </a>
        </nav>
    </div>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

.header {
    display: flex;
    flex-direction: column;
    .button {
        @include media(s) {
            display: none;
        }
    }
}
.nav {
    display: none;
    flex-direction: column;
    @include media(s) {
        display: flex;
    }
    &.open {
        display: flex;
    }
}
.link {
    color: green;
}
</style>