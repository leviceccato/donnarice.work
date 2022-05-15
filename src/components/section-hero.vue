<script lang="ts" setup>
import Text from './text.vue'
import InputText from './input-text.vue'
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
                I’m open to new employment opportunities. Send me a message.
            </Text>
            <form
                name="contact"
                :class="$style.form"
                method="POST"
                data-netlify="true"
            >
                <label :class="$style.formField">
                    <Text
                        :class="$style.formLabel"
                        variant="heading-label"
                    >
                        Message
                    </Text>
                    <InputText
                        name="message"
                        rows="4"
                        type="textarea"
                    />
                </label>
                <label :class="$style.formField">
                    <Text
                        :class="$style.formLabel"
                        variant="heading-label"
                    >
                        Email
                    </Text>
                    <InputText name="email" />
                </label>
            </form>
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
.form {
    margin-top: 72px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.formField {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
</style>