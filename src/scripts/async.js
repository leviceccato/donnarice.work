export const sleep = wait => new Promise(resolve => setTimeout(resolve, wait))

export const debounce = function(wait, func) {
    let timeout
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, arguments), wait)
    }
}