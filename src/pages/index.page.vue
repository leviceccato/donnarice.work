<script lang="ts" setup>
import { createColor, Color } from '../scripts/color'
import { NonEmptyArray } from '../scripts/utilities'

import LayoutDefault from '../components/layout-default.vue'
import SectionHero from '../components/section-hero.vue'
import SectionWork from '../components/section-work.vue'
import SectionKindWords from '../components/section-kind-words.vue'

const COLORS: NonEmptyArray<Color> = [
    createColor('#EDEDED'), // Grey
    createColor('#E1FAD8'), // Green
    createColor('#CFEEEE'), // Blue
    createColor('#F6E1E1'), // Red
    createColor('#EDEDED'), // Grey
]
</script>

<template>
    <LayoutDefault :colors="COLORS">
        <template #head="{ trackSectionMount }">
            <SectionHero
                :class="$style.hero"
                aria-hidden
            />
        </template>
        <template #tail="{ trackSectionMount }">
            <SectionWork
                id="work"
                :class="$style.work"
                @vnode-mounted="trackSectionMount"
            />
            <SectionKindWords
                id="kind-words"
                :class="$style.kindWords"
                @vnode-mounted="trackSectionMount"
            />
        </template>
    </LayoutDefault>
</template>

<style lang="scss" module>
@use '../styles/util.scss';

.hero {
    min-height: 100vh;
    @include util.fluid(padding-top padding-bottom, 20px, 152px);
}
.work {
    @include util.fluid(padding-bottom, 20px, 152px);
}
</style>