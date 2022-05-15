<script lang="ts" setup>
import Button from './button.vue'
</script>

<template>
    <Button>
        <span :class="$style.container">
            <slot />
        </span>
    </Button>
</template>

<style lang="scss" module>
.container {
    display: flex;
    align-items: center;
    gap: 1em;
}
</style>