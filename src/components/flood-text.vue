<script setup>
import { computed } from 'vue'

const props = defineProps({
    text: { type: String, default: '' }
})

const splitText = computed(() => {
    let result = '';

    props.text.split('').forEach(char => {
        let segment = char
        if (char === ' ') {
            segment = '&nbsp;'
        }
        result += `<span>${segment}</span>`
    })

    return result;
})
</script>

<template>
    <span v-html="splitText" />
</template>