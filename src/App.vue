<script lang="ts" setup>
import { createColor } from './scripts/color'
import type { Color } from './scripts/color'
import type { NonEmptyArray } from './scripts/util'

const COLORS: NonEmptyArray<Color> = [
    createColor('#EDEDED'), // Grey
    createColor('#E1FAD8'), // Green
    createColor('#CFEEEE'), // Blue
    createColor('#F6E1E1'), // Red
    createColor('#EDEDED'), // Grey
]
</script>

<template>
    <LayoutDefault
        :colors="COLORS"
        head-id="intro"
    >
        <template #head="{ trackSectionMount }">
            <SectionIntro
                :class="$style.intro"
                data-section-id="intro"
                @vnode-mounted="trackSectionMount"
            />
        </template>
        <template #tail="{ trackSectionMount }">
            <SectionWork
                id="work"
                data-section-id="work"
                :class="$style.work"
                @vnode-mounted="trackSectionMount"
            />
            <SectionKindWords
                id="kind-words"
                data-section-id="kind-words"
                :class="$style.kindWords"
                @vnode-mounted="trackSectionMount"
            />
        </template>
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
