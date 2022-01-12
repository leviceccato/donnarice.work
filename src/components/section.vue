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
    <div ref="observee">
        <Observer
            :id="props.id"
            type="intersection"
            :class="$style.observer"
            namespace="sections"
            :options="options"
            @update="viewSection"
        />
       <slot />
    </div>
</template>

<style lang="scss" module>
.observer {
    position: fixed;
    inset: 0;
    pointer-events: none;
}
</style>