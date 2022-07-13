<script lang="ts" setup>
import Btn from './Btn.vue'
import Txt from './Txt.vue'
</script>

<template>
    <Btn>
        <span :class="$style.container">
            <Txt variant="heading-button">
                <slot />
            </Txt>
        </span>
    </Btn>
</template>

<style lang="scss" module>
.container {
    display: flex;
    align-items: center;
    gap: 1em;
    border: 2px solid currentColor;
    border-radius: 1000px;
    padding: 0.3em 0.8em;
    &:active {
        background-color: var(--col-black-1);
        border-color: var(--col-black-1);
        color: var(--dynamic-color);
    }
}
</style>
