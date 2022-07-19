<script lang="ts" setup>
const { ratio } = defineProps<{
    ratio: number
}>()
</script>

<template>
    <span :class="$style.root">
        <span
            :class="$style.wrapper"
            :style="{ paddingBottom: `${(1 / ratio) * 100}%` }"
        >
            <span :class="$style.content">
                <slot />
            </span>
        </span>
    </span>
</template>

<style lang="scss" module>
.root {
    display: block;
}
.wrapper {
    display: block;
    position: relative;
    width: 100%;
}
.content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
