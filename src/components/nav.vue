<script lang="ts" setup>
import { computed, ref } from 'vue'

import Text from './text.vue'
import Button from './button.vue'

const {
    navData = [],
    activeIndex = 0
} = defineProps<{
    activeIndex?: number
    navData: {
        href: string
        text: string
    }[]
}>()

const emit = defineEmits<{
    (event: 'navigate', href: string): void
}>()
</script>

<template>
    <nav :class="$style.root">
        <div :class="$style.indicatorContainer">
            <div :class="$style.indicator" />
        </div>
        <div :class="$style.buttons">
            <Button
                v-for="item, index in navData"
                :key="index"
                :class="$style.button"
                data-cursor
                data-cursor-padding-x="12"
                data-cursor-padding-y="4"
                :href="`#${item.href}`"
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
}
.buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 48px;
}
.indicator {
    width: 8px;
    height: 8px;
    border: 2px solid currentColor;
    border-radius: 1000px;
}
</style>
