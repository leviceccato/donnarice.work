<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useScroll } from '../scripts/use-scroll'

import Text from './text.vue'
import Button from './button.vue'

const emit = defineEmits<{
    (event: 'navigate', href: string): void
}>()

const scroll = useScroll()

const activeIndex = ref(0)

const navData = computed(() => {
    return [
        {
            href: '#home',
            text: 'Home'
        },
        {
            href: '#work',
            text: 'Work'
        },
        {
            href: '#kind-words',
            text: 'Kind words'
        },
    ]
})
</script>

<template>
    <nav :class="$style.root">
        <div
            v-for="item, index in navData"
            :key="index"
            :class="[$style.item, { [$style.active]: index === activeIndex }]"
        >
            <div :class="$style.indicator" />
            <Button
                :class="$style.button"
                data-cursor
                data-cursor-padding-x="12"
                data-cursor-padding-y="4"
                :href="item.href"
                @click="emit('navigate', item.href)"
            >
                <Text variant="body-medium">
                    {{ item.text }}
                </Text>
            </Button>
        </div>
    </nav>
</template>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 48px;
}
.item {
    display: flex;
    position: relative;
    align-items: center;
    gap: 20px;
    &.active {
        .indicator {
            opacity: 1;
        }
    }
}
.indicator {
    width: 8px;
    height: 8px;
    border: 2px solid currentColor;
    opacity: 0;
    border-radius: 1000px;
    position: absolute;
    right: calc(16px + 100%);
}
</style>
