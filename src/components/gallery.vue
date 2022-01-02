<script setup>
const props = defineProps({
    items: { type: Array, default: () => [] }
})
</script>

<template>
    <div :class="$style.gallery">
        <div :class="$style.container">
            <div
                v-for="item, index in items"
                :key="index"
                :class="$style.item"
            >
                <figure :class="$style.imageContainer">
                    <img
                        :class="$style.image"
                        :src="item.image"
                        :alt="item.imageAlt || ''"
                    />
                </figure>
                <div :class="$style.textContainer">
                    <div
                        :class="$style.text"
                        v-html="item.text"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.gallery {

}

.container {

}
</style>