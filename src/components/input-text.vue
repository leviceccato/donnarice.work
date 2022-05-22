<script lang="ts" setup>
import { computed } from 'vue'

const {
    type = 'input',
    value,
} = defineProps<{
    type?: 'input' | 'textarea'
    value?: string
}>()

const emit = defineEmits<{
    (event: 'update:value', value: string): void
}>()
</script>

<template>
    <Component
        :is="type"
        :class="$style.root"
        :value="value"
        @input="emit('update:value', $event.target.value)"
        :type="(type === 'input') ? 'text' : null"
    />
</template>

<style lang="scss" module>
@use '../styles/util.scss';

.root {
    border: none;
    border-bottom: 2px solid var(--dynamic-color);
    resize: vertical;
    padding: 8px;
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
    &::placeholder {
        color: var(--col-black-1);
        opacity: 0.5;
    }
}
</style>