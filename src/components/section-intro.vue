<script lang="ts" setup>
import { ref } from 'vue'

import Text from './text.vue'
import InputText from './input-text.vue'
import ButtonForm from './button-form.vue'
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <Text variant="heading-small">
                Donna Rice
            </Text>
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
                data-cursor
                data-cursor-padding-x="8"
                data-cursor-padding-y="8"
            >
                Contact me
            </ButtonForm>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    max-width: 600px;
}
.intro {
    margin-top: 72px;
}
.body {
    margin-top: 72px;
}
.ctaButton {
    margin-top: 48px;
}
</style>