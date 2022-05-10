<template>
    <div :class="$style.root">
        <div :class="$style.column" />
        <div :class="[$style.column, $style.main]">
            asd
        </div>
        <div :class="$style.column" />
    </div>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 20px;
}
</style>