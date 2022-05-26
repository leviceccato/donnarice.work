<script lang="ts" setup>
import { createColor } from '../scripts/color'

import LayoutDefault from '../components/layout-default.vue'
import SectionHero from '../components/section-hero.vue'
import SectionWork from '../components/section-work.vue'
import SectionKindWords from '../components/section-kind-words.vue'

const COLORS = [
    createColor('#EDEDED'), // Grey
    createColor('#E1FAD8'), // Green
    createColor('#CFEEEE'), // Blue
    createColor('#F6E1E1'), // Red
    createColor('#EDEDED'), // Grey
]
</script>

<template>
    <LayoutDefault :colors="COLORS">
        <SectionHero />
        <SectionWork />
        <SectionKindWords />
    </LayoutDefault>
</template>
