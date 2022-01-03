<script>
import { onMounted, ref } from 'vue'

let uuid = 0

export default {
    setup() {
        let id = ref('')

        onMounted(() => {
            id.value = `unique-id-${uuid}`
            uuid++
        })

        return { id }
    }
}
</script>

<template>
    <slot v-bind="{ id }" />
</template>