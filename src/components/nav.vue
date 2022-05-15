<script lang="ts" setup>
import { computed } from 'vue'
import { useScroll } from '../scripts/use-scroll'

import ButtonNav from './button-nav.vue'

const emit = defineEmits<{
    (event: 'navigate', href: string): void
}>()

const scroll = useScroll()

const navData = computed(() => {
    return [
        {
            href: '#home',
            text: 'Home'
        },
        {
            href: '#work',
            text: 'Work'
        },
        {
            href: '#kind-words',
            text: 'Kind words'
        },
    ]
})
</script>

<template>
    <nav :class="$style.root">
        <ButtonNav
            v-for="data in navData"
            :key="data.href"
            :href="data.href"
            :is-active="true"
            :class="$style.link"
            @click="emit('navigate', data.href)"
        >
            {{ data.text }}
        </ButtonNav>
    </nav>
</template>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
    gap: 48px;
}
</style>
