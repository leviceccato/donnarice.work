<script setup>
import { defineProps, watch, ref } from 'vue'
import { animate, easeInOutSine } from '../scripts/animation.js'

import UniqueId from './unique-id.vue'

const props = defineProps({
    amount: { type: Number, default: 0 },
    type: { type: String, default: 'thick' }, // 'thin'
    duration: { type: Number, default: 1 } // 1 means instant
})

const operatorMap = {
    thick: 'dilate',
    thin: 'erode'
}

const radius = ref(props.amount)

watch(() => props.amount, amount => {
    animate(
        radius.value,
        amount,
        Math.max(1, props.duration),
        easeInOutSine,
        value => radius.value = value
    )
})
</script>

<template>
    <UniqueId v-slot="{ id }">
        <svg :class="$style.svg">
            <defs>
                <filter :id="id">
                    <feMorphology
                        :operator="operatorMap[props.type]"
                        :radius="radius"
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