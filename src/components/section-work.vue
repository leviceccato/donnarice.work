<script lang="ts" setup>
import Text from './text.vue'
import Image from './image.vue'
</script>

<template>
    <div id="work" :class="$style.root">
        <div :class="$style.container">
            <div :class="$style.items">
                <div :class="$style.item">
                    <div :class="$style.itemTextContainer">
                        <Text
                            :class="$style.itemText"
                            variant="body-small"
                        >
                            <p>
                                Hello this is something
                            </p>
                        </Text>
                    </div>
                    <div :class="$style.itemImageContainer">
                        <Image
                            src="/images/1-1.png"
                            alt=""
                            :class="$style.itemImage"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.item {
    display: grid;
    grid-template-columns: [sidebar] 300px [main] 2fr;
    grid-gap: 20px;
}
.itemTextContainer {
    grid-column-start: sidebar;
}
.itemImageContainer {
    background-color: var(--col-white);
    grid-column-start: main;
    padding: 100px;
}
.itemImage {
    max-height: calc(100vh - 200px);
}
</style>