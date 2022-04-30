<script setup>
import { inject, ref, defineProps, onMounted } from 'vue'

import Observer from './observer.vue'

const props = defineProps({
    id: { type: String }
})

const scrollContext = inject('scrollContext', null)

const options = () => ({
    threshold: 0.5,
    root: observee.value
})

const observee = ref(null)

const viewSection = ({ entry }) => {
    if (!entry.isIntersecting) return
    if (!scrollContext.value) return
    if (!props.id) return

    scrollContext.value.setSection(props.id)
}
</script>

<template>
    <div
        :class="$style.section"
        :id="props.id"
    >
        <Observer
            :class="$style.observer"
            type="intersection"
            namespace="sections"
            :options="options"
            @update="viewSection"
        />
        <slot />
    </div>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

.section {
    position: relative;
}

@include spec('.observer', 2) {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vw;
}
</style>