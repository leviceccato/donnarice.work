<script lang="ts" setup>
import { useAttrs } from 'vue'

import Button from './button.vue'
import Text from './text.vue'

const {
    isActive = false,
} = defineProps<{
    isActive: boolean
}>()
</script>

<template>
    <Button :class="[$style.root, { [$style.active]: isActive }]">
        <span :class="$style.container">
            <span :class="$style.indicator" />
            <Text variant="body-medium">
                <slot />
            </Text>
        </span>
    </Button>
</template>

<style lang="scss" module>
.root {
    &.active {
        .indicator {
            opacity: 1;
        }
    }
}
.container {
    display: flex;
    align-items: center;
    gap: 1em;
}
.indicator {
    width: 8px;
    height: 8px;
    border: 2px solid currentColor;
    opacity: 0;
}
</style>