<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createColor } from './scripts/color'
import type { Color } from './scripts/color'
import type { NonEmptyArray } from './scripts/util'

import LayoutDefault from './components/LayoutDefault.vue'
import SectionIntro from './components/SectionIntro.vue'
import SectionWork from './components/SectionWork.vue'
import SectionKindWords from './components/SectionKindWords.vue'

const COLORS: NonEmptyArray<Color> = [
    createColor('#EDEDED'), // Grey
    createColor('#E1FAD8'), // Green
    createColor('#CFEEEE'), // Blue
    createColor('#F6E1E1'), // Red
    createColor('#EDEDED'), // Grey
]

const SECTIONS: NonEmptyArray<{ href: string; text: string }> = [
    {
        href: 'intro',
        text: 'Intro',
    },
    {
        href: 'work',
        text: 'Work',
    },
    {
        href: 'kind-words',
        text: 'Kind words',
    },
]

const root = ref<InstanceType<typeof LayoutDefault> | null>(null)

onMounted(() => {
    root.value?.initObservers()
})
</script>

<template>
    <LayoutDefault
        :colors="COLORS"
        :sections="SECTIONS"
        ref="root"
    >
        <SectionIntro
            id="intro"
            :class="$style.intro"
        />
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
