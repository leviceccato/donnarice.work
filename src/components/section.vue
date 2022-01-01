<script setup>
import { inject } from 'vue'

import Observer from './observer.vue'

const props = defineProps({
    id: { type: String }
})

const scrollContext = inject('scrollContext', null)

const options = () => ({
    threshold: 0.5
})

const viewSection = ({ entry }) => {
    if (!entry.isIntersecting) return
    if (!scrollContext) return
    if (!props.id) return

    scrollContext.value.setSection(props.id)
}
</script>

<template>
    <Observer
        :id="props.id"
        type="intersection"
        namespace="sections"
        :options="options"
        @update="viewSection"
    >
        <slot />
    </Observer>
</template>