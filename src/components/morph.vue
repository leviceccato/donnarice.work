<script setup>
import { defineProps, watch, ref } from 'vue'
import { animate, easeInOutSine } from '../scripts/animation.js'

import UniqueId from './unique-id.vue'

const props = defineProps({
    radius: { type: Number, default: 0 },
    operator: { type: String, default: 'dilate' }, // 'erode'
    duration: { type: Number, default: 0 } // 0 means instant
})

const _radius = ref(props.radius)

watch(() => props.radius, radius => {
    animate(
        _radius.value,
        radius,
        props.duration,
        easeInOutSine,
        value => _radius.value = value
    )
})
</script>

<template>
    <UniqueId v-slot="{ id }">
        <svg :class="$style.svg">
            <defs>
                <filter :id="id">
                    <feMorphology
                        :operator="props.operator"
                        :radius="_radius"
                    />
                </filter>
            </defs>
        </svg>
        <slot v-bind="{ filter: `url(#${id})` }" />
    </UniqueId>
</template>

<style lang="scss" module>
.svg {
    display: block;
    height: 0;
}
</style>