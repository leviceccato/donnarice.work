<script lang="ts" setup>
import Link from '../components/link.vue'
</script>

<template>
    <div class="layout">
        <div class="navigation">
            <a href="/" class="logo">
                <img src="../static/logo.svg" height="64" width="64" alt="logo" />
            </a>
            <Link href="/">Home</Link>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/base';
@use '../styles/vars';

html {
    @include vars.to-custom-props();
}
</style>
