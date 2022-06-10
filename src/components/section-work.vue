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
                        <div :class="$style.itemImageWrapper">
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
    </div>
</template>

<style lang="scss" module>
.item {
    display: flex;
    gap: 20px;
}
.itemTextContainer {
    width: 300px;
}
.itemImageContainer {
    display: flex;
}
</style>