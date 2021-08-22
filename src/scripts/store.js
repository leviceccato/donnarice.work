import { createStore } from 'nanostores'

const scroll = createStore(() => scroll.set(0))
const setScroll = newScroll => scroll.set(newScroll)

const rotation = createStore(() => rotation.set(0))
const setRotation = newRotation => rotation.set(newRotation)

export {
    scroll,
    setScroll,
    rotation,
    setRotation,
}