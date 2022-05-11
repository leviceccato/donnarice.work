<script lang="ts" setup>
import Text from './text.vue'
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.column" />
        <div :class="[$style.column, $style.main]">
            <Text variant="heading-small">Donna Rice</Text>
            <Text
                variant="heading-large"
                :class="$style.intro"
            >
                I’m a draftsperson and senior PA based in Newcastle — Australia.
            </Text>
            <Text
                variant="body"
                :class="$style.body"
            >
                I’ve worked as an ___ at ____, as a ____ and have experience doing ____.
                I’m passionate about the design of interior spaces and love to surround myself with ____.<br /><br />
                I’m open to new employment opportunities. Send me a message.
            </Text>
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
.intro {
    margin-top: 72px;
}
.body {
    margin-top: 72px;
}
</style>