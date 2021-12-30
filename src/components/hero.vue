<script setup>
import { computed, inject } from 'vue'

import Link from './link.vue'
import Text from './text.vue'
import FloodText from './flood-text.vue'

const isReady = inject('isReady', false)
const scrollContext = inject('scrollContext', null)

const isTextShown = computed(() => {
    if (scrollContext) {
        return isReady.value && (scrollContext.value.scrolling.value === 'none')
    }
    return isReady.value
})
</script>

<template>
    <div :class="$style.hero">
        <div :class="$style.container">
            <Text
                :is-shown="isTextShown"
                :class="$style.heading"
                tag="h1"
            >
                Donna is a draftsperson and senior PA based in Newcastle, Australia.
            </Text>
            <div :class="$style.linkWrapper">
                <Link
                    href="#work"
                    is-virtual
                >
                    <Text :is-shown="isTextShown">
                        <FloodText text="View work" />
                    </Text>
                </Link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    letter-spacing: -0.015em;
    line-height: 1.2;
    padding: 40px 35px 0 35px;
    box-sizing: content-box;

    @include media(m) {
        font-size: 50px;
        padding: 40px 100px 0 100px;
    }
}

.container {
    max-width: 400px;

    @include media(m) {
        max-width: 600px;
    }
}

.linkWrapper {
    margin-top: 1em;
}
</style>