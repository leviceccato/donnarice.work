<script>
import { ref } from 'vue'

let uuid = 0

export default {
    setup() {
        const id = ref(`unique-id-${uuid}`)
        uuid++

        return {
            id
        }
    }
}
</script>

<template>
    <slot v-bind="{ id }" />
</template>