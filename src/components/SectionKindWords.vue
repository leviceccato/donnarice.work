<script lang="ts" setup>
import Txt from './Txt.vue'
</script>

<template>
    <div :class="$style.root">
        <Txt variant="heading-small">Kind words</Txt>
    </div>
</template>

<style lang="scss" module>
.root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
