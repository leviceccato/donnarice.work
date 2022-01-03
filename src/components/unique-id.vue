<script>
let uuid = 0

export default {
    setup() {
        const id = `unique-id-${uuid}`
        uuid++

        return { id }
    }
}
</script>

<template>
    <slot v-bind="{ id }" />
</template>