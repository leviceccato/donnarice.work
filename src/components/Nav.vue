<script lang="ts" setup>
import { computed, ref } from 'vue'

import Btn from './Btn.vue'
import Txt from './Txt.vue'

const { sections = [], activeSection } = defineProps<{
    activeSection?: string
    sections: {
        href: string
        text: string
    }[]
}>()

const activeIndex = computed(() => {
    if (!activeSection) {
        return 0
    }
    return getIndex(activeSection)
})

const emit = defineEmits<{
    (
        event: 'navigate',
        data: {
            href: string
            from: number
            to: number
        },
    ): void
}>()

function getIndex(href: string): number {
    return sections.findIndex((section) => href === section.href)
}
</script>

<template>
    <nav :class="$style.root">
        <ul :class="$style.container">
            <li
                v-for="(section, index) in sections"
                :key="index"
                :class="$style.item"
            >
                <div
                    :class="$style.indicator"
                    v-if="index === 0"
                />
                <Btn
                    :class="$style.button"
                    data-cursor
                    data-cursor-padding-x="12"
                    data-cursor-padding-y="4"
                    @click.prevent="
                        emit('navigate', {
                            href: section.href,
                            from: activeIndex,
                            to: getIndex(section.href),
                        })
                    "
                >
                    <Txt variant="body-medium">
                        {{ section.text }}
                    </Txt>
                </Btn>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
}
.container {
    margin: -24px 0;
}
.item {
    padding: 24px 0 24px 28px;
    position: relative;
}
.indicator {
    position: absolute;
    left: 0;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid currentColor;
    border-radius: 1000px;
    transition: top 300ms var(--ease-out-quint);
    top: calc((v-bind(activeIndex) * 100%) + 50%);
}
</style>
