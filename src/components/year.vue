<script>
const year = new Date().getFullYear()

export default {
    setup() {
        return {
            year,
        }
    },
}
</script>

<template>
{{ year }}
</template>
