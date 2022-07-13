<template>
    <a :class="$style.link">
        <slot />
    </a>
</template>

<style lang="scss" module>
.link {
    padding: 3px 10px;
    &.active {
        background-color: #eee;
    }
}
</style>
