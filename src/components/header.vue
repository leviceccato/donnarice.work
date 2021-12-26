<template>
    <header :class="$style.header">
        <a
            :class="$style.link"
            href="/"
        >
            Home
        </a>
    </header>
</template>

<style lang="scss" module>
.header {
    border: 1px solid red;
}
.link {
    color: green;
}
</style>