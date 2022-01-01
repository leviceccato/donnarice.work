<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

const props = defineProps({
    query: { type: String, required: true }
})

const isMatching = ref(false)

let queryList

const setIsMatching = list => {
    isMatching.value = list.matches
}

onMounted(() => {
    queryList = window.matchMedia(props.query)
    setIsMatching(queryList)
    queryList.addEventListener('change', setIsMatching)
})

onBeforeUnmount(() => {
    queryList.removeEventListener(setIsMatching)
})
</script>

<template>
    <slot v-bind="{ isMatching }" />
</template>