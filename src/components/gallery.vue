<script setup>
import { inject } from 'vue'

import Image from './image.vue'
import Text from './text.vue'
import FloodText from './flood-text.vue'

const props = defineProps({
    items: { type: Array, default: () => [] }
})

const isContentShown = inject('isContentShown', false)
</script>

<template>
    <div :class="$style.gallery">
        <div :class="$style.container">
            <div
                v-for="item, index in items"
                :key="index"
                :class="$style.item"
            >
                <div :class="$style.imageContainer">
                    <Image
                        v-for="image, index in item.images"
                        :key="index"
                        :class="$style.image"
                        :src="image.src"
                        :alt="image.alt || ''"
                        :is-shown="isContentShown"
                    />
                </div>
                <div :class="$style.textContainer">
                    <div :class="$style.text">
                        <Text
                            v-if="item.heading"
                            crop="uppercase"
                            :is-shown="isContentShown"
                            :class="$style.heading"
                            tag="h3"
                        >
                            {{ item.heading }}
                        </Text>
                        <Text
                            v-for="paragraph, index in item.text"
                            :key="index"
                            :class="$style.paragraph"
                            :is-shown="isContentShown"
                        >
                            {{ paragraph }}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

.gallery {
    padding: 120px 20px;
}

.item {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include media(m) {
        flex-direction: row;
    }

    &:not(:first-of-type) {
        margin-top: 120px;
    }
}

@include spec('.image', 2) {
    max-height: calc(100vh - 40px);
    max-width: 60vw;

    &:not(:first-of-type) {
        margin-top: 120px;
    }
}

.textContainer {
    margin-top: 25px;
    max-width: 20em;
    width: 20em;
    line-height: 1.3;

    @include media(m) {
        margin-top: 0;
        margin-left: 35px;
        padding: 25px 0;
    }
}

.text {
    position: sticky;
    top: 120px;
}

@include spec('.heading', 2) {
    margin-bottom: 1em;
}

@include spec('.paragraph', 2) {
    &:not(:first-of-type) {
        margin-top: 1em;
    }
}
</style>