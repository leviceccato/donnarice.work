<script lang="ts" setup>
const {
    src,
    alt = ''
} = defineProps<{
    src: string,
    alt?: string
}>()
</script>

<template>
    <div :class="$style.root">
        <img
            :class="$style.image"
            :alt="alt"
            :src="src"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    background-color: var(--col-white);
    padding: 100px;
}
.image {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 400px);
}
</style>