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
    <DynamicBackground>
        <Header />
        <div style="height: 3000px">
            <Hero id="intro" />
            <div id="work" />
        </div>
    </DynamicBackground>
</template>