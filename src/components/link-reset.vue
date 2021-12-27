<template>
    <a :class="$style.link">
        <slot />
    </a>
</template>

<style lang="scss" module>
.link {
    color: inherit;
    text-decoration: inherit;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    &:focus {
        outline: none;
    }
    &:focus-visible {
        box-shadow: 0px 0px 0px 2px currentColor;
    }
}
</style>