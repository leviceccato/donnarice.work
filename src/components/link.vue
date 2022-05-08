<script lang="ts" setup>
import { usePageContext } from '../scripts/use-page-context'

const ctx = usePageContext()
</script>

<template>
    <a :class="[$style.link, { [$style.active]: ctx?.urlPathname === $attrs.href }]">
        <slot />
    </a>
</template>

<style lang="scss" module>
.link {
    padding: 3px 10px;
    &.active {
        background-color: #eee;
    }
}
</style>
