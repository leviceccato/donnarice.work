<template>
    <svg :class="$style.svg">
        <defs>
            <filter id="filter-roughen">
                <!-- <feTurbulence
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                    seed="0"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="6"
                /> -->
                <feTurbulence
                    baseFrequency="0.01"
                    numOctaves="3"
                    result="noise"
                    seed="0"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1"
                />
            </filter>
        </defs>
    </svg>
</template>

<style lang="scss" module>
.svg {
    display: block;
    height: 0;
}
</style>