<script setup>
import { onMounted, provide, ref } from 'vue'

import DynamicBackground from './dynamic-background.vue'
import Section from './section.vue'
import Header from './header.vue'
import Hero from './hero.vue'
import Text from './text.vue'

const isReady = ref(false)

provide('isReady', isReady)

onMounted(() => isReady.value = true)
</script>

<template>
    <DynamicBackground v-slot="{ scrolling, scrollDuration }">
        <Header />
        <div :class="$style.container">
            <main
                :style="{ animationDuration: `${scrollDuration}ms` }"
                :class="[$style.main, {
                    [$style.scrollingDown]: scrolling === 'down',
                    [$style.scrollingUp]: scrolling === 'up'
                }]"
            >
                <Section id="intro">
                    <Hero />
                </Section>
                <Section id="work">
                    <Hero />
                </Section>
                <Hero id="testimonials" />
                <Hero id="resume" />
                <Hero id="contact" />
            </main>
        </div>
    </DynamicBackground>
</template>

<style lang="scss" module>

@keyframes move {
    0% {
        transform: translateY(0);
    }
    49.99% {
        transform: translateY(-30px);
    }
    50% {
        transform: translateY(30px);
    }
    100% {
        transform: translateY(0);
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
</style>