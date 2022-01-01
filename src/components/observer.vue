

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
    setup(props) {

        const el = ref(null)

        const observe = () => {
            // Store reference to component on the DOM element so
            // we can access its $emit method in the observer callback
            el.__component = getCurrentInstance()
            observers[props.namespace].observer.observe(el)
            observers[props.namespace].count++
        }

        const unobserve = () => {
            delete el.__component
            observers[props.namespace].observer.unobserve(el)
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
                        entry.target.__component.$emit('update', { entry, entries, observer })
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
    }
}
</script>

<template>
    <Component
        :is="props.tag"
        :class="$style.observer"
    >
        <slot />
    </Component>
</template>

<style lang="scss" module>
.observer { display: block; }
</style>