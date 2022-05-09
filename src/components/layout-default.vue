<template>
    <div :class="$style.root">
        <div class="navigation">
            <a href="/" class="logo">
                <img src="../static/logo.svg" height="64" width="64" alt="logo" />
            </a>
            <Link href="/">Home</Link>
            <Link href="/about">ABOUT</Link>
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

<style lang="scss" module>
.root {}
</style>