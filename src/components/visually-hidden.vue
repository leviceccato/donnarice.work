<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    isFocusable: { type: Boolean, default: false }
})
</script>

<template>
    <span :class="[$style.visuallyHidden, { [$style.focusable]: props.isFocusable }]">
        <slot />
    </span>
</template>

<style lang="scss" module>
.visuallyHidden {
    &:not(.focusable),
    &.focusable:not(:focus) {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
}
</style>