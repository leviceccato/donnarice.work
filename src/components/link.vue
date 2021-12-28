<script setup>
import LinkReset from './link-reset.vue'
</script>

<template>
    <LinkReset :class="$style.link">
        <slot />
    </LinkReset>
</template>

<style lang="scss" module>
.link.link {
    display: inline-flex;
    padding: 0.2em;
    margin: -0.2em;
}
</style>