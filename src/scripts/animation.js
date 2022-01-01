export const easeInOutSine = x => -(Math.cos(Math.PI * x) - 1) / 2

export const animate = (from, to, duration, ease, callback) => {
    return new Promise(resolve => {
        let start, stop
        const startAnimation = timestamp => {
            start = timestamp
            draw(timestamp)
        }
        const draw = now => {
            if (stop) {
                resolve()
                return callback(to)
            }
            if (now - start >= duration) stop = true
            const delta = (now - start) / duration
            callback(from + (to - from) * ease(delta), stop)
            window.requestAnimationFrame(draw)
        }
        window.requestAnimationFrame(startAnimation)
    })
}