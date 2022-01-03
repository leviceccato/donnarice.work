<script>
import { ref, watch } from 'vue'
import { animate, easeInOutSine } from '../scripts/animation.js'

import ImgReset from './img-reset.vue'
import UniqueId from './unique-id.vue'

export default {
    inheritAttrs: false,
    components: { ImgReset, UniqueId },
    props: {
        isShown: { type: Boolean, default: false }
    },
    setup(props, { attrs }) {
        const maxErosionRadius = 3
        const minErosionRadius = 0
        const erosionAnimDuration = 550

        const erosionRadius = ref(maxErosionRadius)

        watch(() => props.isShown, isShown => {
            animate(
                erosionRadius.value,
                isShown ? maxErosionRadius : minErosionRadius,
                erosionAnimDuration,
                easeInOutSine,
                radius => erosionRadius.value = radius
            )
        })

        return {
            erosionRadius,
            attrs
        }
    }
}
</script>

<template>
    <UniqueId v-slot="{ id }">
        <svg :class="$style.svg">
            <defs>
                <filter :id="id">
                    <feMorphology
                        operator="erode"
                        :radius="erosionRadius"
                    />
                </filter>
            </defs>
        </svg>
        <ImgReset
            v-bind="attrs"
            :style="{ filter: `url(#${id})` }"
        />
    </UniqueId>
</template>

<style lang="scss" module>
.svg {
    display: block;
    height: 0;
}
</style>