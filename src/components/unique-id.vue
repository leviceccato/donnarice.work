<script>
import { onMounted, ref } from 'vue'

let uid = 0

export default {
    setup() {
        let id = ref('')

        onMounted(() => {
            id.value = `uid-${uuid}`
            uid++
        })

        return { id }
    }
}
</script>

<template>
    <slot v-bind="{ id }" />
</template>