<script lang="ts" setup>
import Nav from './nav.vue'
</script>

<template>
    <div :class="$style.root">
        <Nav />
        <main :class="$style.main">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" module>
@use '../styles/base';
@use '../styles/vars';
@use '../styles/util';

:global {
    html {
        @include vars.to-custom-props();
    }
}
.root {
    background-color: var(--col-grey-1);
    min-height: 100vh;
    @include util.fluid(padding, 20px, 152px);
}
</style>