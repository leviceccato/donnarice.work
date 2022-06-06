<script lang="ts" setup>
import Button from './button.vue'
import Text from './text.vue'
</script>

<template>
    <Button>
        <span :class="$style.container">
            <Text variant="heading-small">
                <slot />
            </Text>
        </span>
    </Button>
</template>

<style lang="scss" module>
.container {
    display: flex;
    align-items: center;
    gap: 1em;
    border: 2px solid currentColor;
    border-radius: 1000px;
    padding: 0.3em 0.8em;
    &:hover {
        background-color: var(--col-black-1);
        border-color: var(--col-black-1);
        color: var(--dynamic-color);
    }
}
</style>