<script setup>
import { onMounted, provide, ref } from 'vue'

import DynamicBackground from './dynamic-background.vue'
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
        <main
            style="height: 3000px"
            :style="{ transitionDuration: `${scrollDuration / 2}ms` }"
            :class="[$style.main, {
                [$style.scrollingDown]: scrolling === 'down',
                [$style.scrollingUp]: scrolling === 'up'
            }]"
        >
            <Hero id="intro" />
            <Hero id="work" />
        </main>
    </DynamicBackground>
</template>

<style lang="scss" module>
.main {
    transition-property: transform;
    transition-timing-function: ease;

    &.scrollingDown {
        transform: translateY(-20px);
    }

    &.scrollingUp {
        transform: translateY(20px);
    }
}
</style>