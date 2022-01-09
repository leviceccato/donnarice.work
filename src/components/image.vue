<script>
import { ref, watch } from 'vue'

import ImgReset from './img-reset.vue'
import Weight from './weight.vue'

const maxThinning = 3
const minThinning = 0

export default {
    inheritAttrs: false,
    components: { ImgReset, Weight },
    props: {
        isShown: { type: Boolean, default: false }
    },
    setup(props, { attrs }) {
        const thinning = ref(maxThinning)

        const setThinning = isShown => {
            thinning.value = isShown
                ? minThinning
                : maxThinning
        }

        setThinning(props.isShown)
        watch(() => props.isShown, setThinning)

        return {
            thinning,
            attrs
        }
    }
}
</script>

<template>
    <Weight
        :amount="thinning"
        type="thin"
        :duration="550"
        v-slot="{ filter }"
    >
        <ImgReset
            v-bind="attrs"
            :style="{ filter }"
        />
    </Weight>
</template>