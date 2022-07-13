<script lang="ts" setup>
import BtnForm from './BtnForm.vue'
import Txt from './Txt.vue'
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <Txt variant="heading-small">Donna Rice</Txt>
            <Txt
                variant="heading-large"
                :class="$style.intro"
            >
                I’m a draftsperson and senior PA based in Newcastle — Australia.
            </Txt>
            <Txt
                variant="body-small"
                :class="$style.body"
            >
                I’ve worked as an ___ at ____, as a ____ and have experience
                doing ____. I’m passionate about the design of interior spaces
                and love to surround myself with ____.<br /><br />
                I’m open to new employment opportunities.
            </Txt>
            <BtnForm
                :class="$style.ctaButton"
                data-cursor
                data-cursor-padding-x="8"
                data-cursor-padding-y="8"
            >
                Contact me
            </BtnForm>
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
