import { createStore } from 'nanostores'

// const scroll = createStore(() => scroll.set(0))
// const setScroll = newScroll => scroll.set(newScroll)

const rotation = createStore(() => rotation.set(0))
const setRotation = (to) => rotation.set(to)

const textRotation = createStore(() => textRotation.set(0))
const setTextRotation = (to) => textRotation.set(to)

const textSkew = createStore(() => textSkew.set(0))
const setTextSkew = (to) => textSkew.set(to)

export {
    // scroll,
    // setScroll,
    rotation,
    setRotation,
    textRotation,
    setTextRotation,
    textSkew,
    setTextSkew,
}