<script lang="ts" setup>
import { createColor } from './scripts/color'

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
        <SectionIntro :class="$style.intro" />
        <SectionWork
            id="work"
            :class="$style.work"
        />
        <SectionKindWords
            id="kind-words"
            :class="$style.kindWords"
        />
    </LayoutDefault>
</template>

<style lang="scss" module>
@use './styles/util.scss';

.intro {
    min-height: 100vh;
    @include util.fluid(padding-top padding-bottom, 20px, 152px);
}
.work {
    @include util.fluid(padding-bottom, 20px, 152px);
}
</style>
