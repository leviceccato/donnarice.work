<script>
import { onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue'

// Store observers in global and allow adding multiple components to it
let observers = {}

export default {
    props: {
        // 'intersection'
        type: { type: String, required: true },
        tag: { type: String, default: 'span' },
        // Group multiple elements into the one observer for performance
        namespace: { type: String, required: true },
        // Options is a function so element properties are accessed
        // after the component has mounted.
        options: { type: Function, default: () => ({}) }
    },
    emits: ['update'],
    setup(props, { emit }) {

        const el = ref(null)

        const observe = () => {
            // Store reference to the emit on the DOM element so
            // we can call it in the observer callback
            el.value.__emit = emit
            observers[props.namespace].observer.observe(el.value)
            observers[props.namespace].count++
        }

        const unobserve = () => {
            delete el.value.__emit
            observers[props.namespace].observer.unobserve(el.value)
            observers[props.namespace].count--
        }

        onMounted(() => {
            // No need to create a new observer, just add this component to the one that
            // already exists
            if (observers[props.namespace]) {
                observe()
                return
            }

            // Store count and increment per component of the same namespace. That way we can
            // disconnect the observer if all components are unobserved.
            observers[props.namespace] = { count: 0 }

            // Create observer based on type
            if (props.type === 'intersection') {
                observers[props.namespace].observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        entry.target.__emit('update', { entry, entries, observer })
                    })
                }, props.options())
            }

            observe()
        })

        onBeforeUnmount(() => {
            unobserve()

            // No entries left, remove the observer and namespace
            if (observers[props.namespace].count < 1) {
                observers[props.namespace].observer.disconnect()
                delete observers[props.namespace]
            }
        })

        return {
            el,
            tag: props.tag
        }
    }
}
</script>

<template>
    <Component
        ref="el"
        :is="tag"
        :class="$style.observer"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
.observer { display: block; }
</style>