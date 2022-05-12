<script lang="ts" setup>
import Button from './button.vue'
</script>

<template>
    <nav :class="$style.root">
        <Button
            href="#home"
            :class="$style.link"
        >
            Home
        </Button>
        <Button
            href="#work"
            :class="$style.link"
        >
            Work
        </Button>
        <Button
            href="#kind-words"
            :class="$style.link"
        >
            Kind words
        </Button>
    </nav>
</template>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
    gap: 48px;
}
</style>
