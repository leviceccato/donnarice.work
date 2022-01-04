<script setup>
import { onMounted, provide, ref } from 'vue'

import SvgDefs from './svg-defs.vue'
import DynamicBackground from './dynamic-background.vue'
import Section from './section.vue'
import Header from './header.vue'
import Hero from './hero.vue'
import Text from './text.vue'
import Gallery from './gallery.vue'

const galleryItems = [
    {
        images: [
            { src: '/images/1-1.png', alt: '' },
            { src: '/images/1-2.png', alt: '' },
            { src: '/images/1-3.png', alt: '' }
        ],
        text: [
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing',
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing'
        ]
    },
    {
        images: [
            { src: '/images/2-1.png', alt: '' },
            { src: '/images/2-2.png', alt: '' },
            { src: '/images/2-4.png', alt: '' }
        ],
        text: [
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing',
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing'
        ]
    },
    {
        images: [
            { src: '/images/3-1.png', alt: '' },
            { src: '/images/3-2.png', alt: '' },
            { src: '/images/3-3.png', alt: '' }
        ],
        text: [
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing',
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing'
        ]
    },
    {
        images: [
            { src: '/images/4-1.png', alt: '' },
            { src: '/images/4-2.png', alt: '' }
        ],
        text: [
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing',
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing'
        ]
    },
    {
        images: [
            { src: '/images/5-1.png', alt: '' }
        ],
        text: [
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing',
            'This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing, This is a thing'
        ]
    }
]

const isReady = ref(false)

provide('isReady', isReady)

onMounted(() => isReady.value = true)
</script>

<template>
    <SvgDefs />
    <DynamicBackground v-slot="{ scrolling, scrollDuration }">
        <Header />
        <main>
            <div
                :style="{ animationDuration: `${scrollDuration}ms` }"
                :class="[$style.container, {
                    [$style.scrollingDown]: scrolling === 'down',
                    [$style.scrollingUp]: scrolling === 'up'
                }]"
            >
                <Section id="intro">
                    <Hero />
                </Section>
                <Section id="work">
                    <Gallery :items="galleryItems" />
                </Section>
                <Section id="testimonials">
                    <Hero />
                </Section>
                <Section id="resume">
                    <Hero />
                </Section>
                <Section id="contact">
                    <Hero />
                </Section>
            </div>
        </main>
    </DynamicBackground>
</template>

<style lang="scss" module>

@keyframes move {
    0% {
        transform: translateY(0);
    }
    49.99% {
        transform: translateY(-30px);
    }
    50% {
        transform: translateY(30px);
    }
    100% {
        transform: translateY(0);
    }
}

.container {
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    &.scrollingDown {
        animation-name: move;
        animation-direction: normal;
    }

    &.scrollingUp {
        animation-name: move;
        animation-direction: reverse;
    }
}
</style>