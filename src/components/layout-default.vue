<script>
import Header from './header.vue'

export default {
    name: 'LayoutDefault',
    components: { Header }
}
</script>

<template>
    <div>
        <Header />
        <slot />
    </div>
</template>