<script lang="ts" setup>
import Text from './text.vue'
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.column" />
        <div :class="[$style.column, $style.main]">
            <Text variant="heading">Donna Rice</Text>
        </div>
        <div :class="$style.column" />
    </div>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 20px;
}
</style>