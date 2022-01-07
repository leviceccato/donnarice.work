<script>
import { ref, watch } from 'vue'

import ImgReset from './img-reset.vue'
import Morph from './morph.vue'

const maxErosionRadius = 3
const minErosionRadius = 0

export default {
    inheritAttrs: false,
    components: { ImgReset, UniqueId },
    props: {
        isShown: { type: Boolean, default: false }
    },
    setup(props, { attrs }) {
        const erosionRadius = ref(maxErosionRadius)

        watch(() => props.isShown, isShown => {
            erosionRadius.value = isShown
                ? maxErosionRadius
                : minErosionRadius
        })

        return {
            erosionRadius,
            attrs
        }
    }
}
</script>

<template>
    <Morph v-slot="{ filter }">
        <ImgReset
            v-bind="attrs"
            :style="{ filter }"
        />
    </Morph>
</template>