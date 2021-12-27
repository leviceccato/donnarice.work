<template>
    <button :class="$style.button">
        <slot />
    </button>
</template>

<style lang="scss" module>
.button {
    cursor: pointer;
    color: inherit;
    background: none;
    border: none;
    font-family: inherit;
    text-align: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    &:focus {
        outline: none;
    }
}
</style>