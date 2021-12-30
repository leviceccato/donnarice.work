<script setup>
import { onMounted, provide, ref } from 'vue'

import DynamicBackground from './dynamic-background.vue'
import Header from './header.vue'
import Hero from './hero.vue'

const isReady = ref(false)

provide('isReady', isReady)

onMounted(() => isReady.value = true)
</script>

<template>
    <DynamicBackground v-slot="{ scrolling }">
        <Header />
        <main
            style="height: 3000px"
            :class="[$style.main, {
                [$style.scrollingDown]: scrolling === 'down',
                [$style.scrollingUp]: scrolling === 'up'
            }]"
        >
            <Hero id="intro" />
            <div id="work" />
        </main>
    </DynamicBackground>
</template>

<style lang="scss" module>
.main {
    transition: transform 350ms ease;

    &.scrollingDown {
        transform: translateY(-20px);
    }

    &.scrollingUp {
        transform: translateY(20px);
    }
}
</style>