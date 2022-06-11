<script lang="ts" setup>
import { computed } from 'vue'

import Text from './text.vue'
import Image from './image.vue'

const items = computed(() => {
    return [
        {
            text: 'This is the text',
            images: [
                {
                    url: '/images/1-1.png',
                    alt: 'temp',
                },
                {
                    url: '/images/1-2.png',
                    alt: 'temp',
                },
                {
                    url: '/images/1-3.png',
                    alt: 'temp',
                },
            ],
        },
        {
            text: 'This is the text',
            images: [
                {
                    url: '/images/2-1.png',
                    alt: 'temp',
                },
                {
                    url: '/images/2-2.png',
                    alt: 'temp',
                },
                {
                    url: '/images/2-3.png',
                    alt: 'temp',
                },
            ],
        },
        {
            text: 'This is the text',
            images: [
                {
                    url: '/images/3-1.png',
                    alt: 'temp',
                },
                {
                    url: '/images/3-2.png',
                    alt: 'temp',
                },
                {
                    url: '/images/3-3.png',
                    alt: 'temp',
                },
            ],
        },
        {
            text: 'This is the text',
            images: [
                {
                    url: '/images/4-1.png',
                    alt: 'temp',
                },
                {
                    url: '/images/4-2.png',
                    alt: 'temp',
                },
            ],
        },
    ]
})
</script>

<template>
    <div
        id="work"
        :class="$style.root"
    >
        <div
            :class="$style.item"
            v-for="item, itemIndex in items"
            :key="itemIndex"
        >
            <div :class="$style.images">
                <Image
                    :class="$style.image"
                    v-for="image, imageIndex in item.images"
                    :key="imageIndex"
                    :src="image.url"
                    :alt="image.alt"
                />
            </div>
            <Text
                :class="$style.text"
                v-if="item.text"
                variant="body-xsmall"
            >
                {{ item.text }}
            </Text>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '../styles/util.scss';

.root {
    display: flex;
    flex-direction: column;
    @include util.fluid(gap, 20px, 152px);
}
.images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
.text {
    margin-top: 48px;
    max-width: 600px;
}
</style>