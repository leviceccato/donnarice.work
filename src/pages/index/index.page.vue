<script setup>
import { onMounted, ref } from 'vue'

const textColor = ref('inherit')

onMounted(() => {
    textColor.value = 'red'
})
</script>

<template>
    <h1>Welcome!</h1>
    This page is:
    <ul>
        <li :style="{ color: textColor }">Rendered to HTML.</li>
    </ul>
</template>
