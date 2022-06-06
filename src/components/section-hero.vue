<script lang="ts" setup>
import { ref } from 'vue'

import Text from './text.vue'
import InputText from './input-text.vue'
import ButtonForm from './button-form.vue'

const message = ref('')
const email = ref('')
</script>

<template>
    <div
        id="hero"
        :class="$style.root"
    >
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
                variant="body-small"
                :class="$style.body"
            >
                I’ve worked as an ___ at ____, as a ____ and have experience doing ____.
                I’m passionate about the design of interior spaces and love to surround myself with ____.<br /><br />
                I’m open to new employment opportunities.
            </Text>
            <ButtonForm
                :class="$style.ctaButton"
                data-cursor="8"
            >
                Contact me
            </ButtonForm>
        </div>
        <div :class="$style.column" />
    </div>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-template-columns: [sidebar] 300px [main-left] 1fr [main-right] 1fr;
    grid-gap: 20px;
}
.intro {
    margin-top: 72px;
}
.body {
    margin-top: 72px;
}
.ctaButton {
    margin-top: 32px;
}
</style>