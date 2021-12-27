<template>
    <span :class="$style.text">
        <slot />
    </span>
</template>

<style lang="scss" module>
.text {
    display: block;
    &::before {
        content: '';
        display: block;
        height: 0;
        width: 0;
        margin-top: calc((var(--capital-height, 0.7) - var(--line-height)) * 0.5em);
    }
}
</style>