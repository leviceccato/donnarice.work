<script lang="ts" setup>
import { computed } from 'vue'

const {
    type = 'input',
} = defineProps<{
    type?: 'input' | 'textarea'
}>()
</script>

<template>
    <Component
        :is="type"
        :class="$style.root"
        :type="(type === 'input') ? 'text' : null"
    />
</template>

<style lang="scss" module>
@use '../styles/util.scss';

.root {
    border: none;
    border-bottom: 2px solid transparent;
    resize: vertical;
    padding: 4px;
    font-family: var(--font-interdisplay);
    letter-spacing: 0.03em;
    &:focus {
        outline: none;
        border-color: currentColor;
    }
    &::-webkit-resizer {
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(util.svg-encode('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><path d="M11.48 4.75v6.74H4.74" stroke="' + util.var(col-black-1) + '" stroke-width="2" stroke-linecap="square"/><path d="M11.48 11.49 4.74 4.75" stroke="#000" stroke-width="2"/></svg>'));
    }
}
</style>