<script setup>
import { computed, inject, useAttrs } from 'vue'

import LinkReset from './link-reset.vue'

const props = defineProps({
    isVirtual: { type: Boolean, default: false }
})

const emit = defineEmits(['follow'])

const attrs = useAttrs()

const scrollContext = inject('scrollContext', null)

const followHref = event => {
    if (!props.isVirtual) return
    if (!attrs.href) return
    if (!scrollContext) return

    event.preventDefault()
    scrollContext.value.scrollTo(attrs.href)
    emit('follow')
}
</script>

<template>
    <LinkReset
        :class="$style.link"
        @click="followHref"
    >
        <slot />
    </LinkReset>
</template>

<style lang="scss" module>
@use '../styles/utilities.scss' as *;

@include spec('.link', 2) {
    display: inline-flex;
    padding: 0.2em;
    margin: -0.2em;
}
</style>