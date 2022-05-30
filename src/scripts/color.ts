const colourFormatErr = Error('colour is incorrectly formatted')

export type RGBA = Array<number>

export type HSLA = Array<number>

export type Color = {
    toRgba(): RGBA,
    toHsla(): HSLA,
    toHex(): string,
    toString(): string,
    toJSON(): RGBA,
}

export const validateHex = (hex: string): string => {
    hex = hex.replace('#', '')
    if (hex.length === 3) {
        hex = [...hex].reduce((result, char) => `${result}${char}${char}`, '')
    }
    else if (hex.length !== 6) {
        throw colourFormatErr
    }
    return hex
}

export const validateRgba = (rgba: RGBA): RGBA => {
    if (rgba.length === 3) {
        rgba.push(1)
    }
    else if (rgba.length !== 4) {
        throw colourFormatErr
    }
    return rgba
}

export const validateHsla = (hsla: HSLA): HSLA => {
    if (hsla.length === 3) {
        hsla.push(1)
    }
    else if (hsla.length !== 4) {
        throw colourFormatErr
    }
    return hsla
}

export const hexToRgba = (hex: string): RGBA => {
    hex = validateHex(hex)
    return validateRgba((hex.match(/.{2}/g) || []).map(x => parseInt(x, 16)))
}

export const rgbaToHex = (rgba: RGBA): string => {
    const [r, g, b] = validateRgba(rgba)
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

export const rgbaToHsla = (rgba: RGBA): HSLA => {
    let [r, g, b] = validateRgba(rgba)
    r /= 255
    g /= 255
    b /= 255

    let h = 0, s = 0, l = 0
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b)
    const delta = cmax - cmin

    if (delta === 0) {
        h = 0
    }
    else if (cmax === r) {
        h = ((g - b) / delta) % 6
    }
    else if (cmax === g) {
        h = (b - r) / delta + 2
    }
    else {
        h = (r - g) / delta + 4
    }

    h = Math.round(h * 60)
    if (h < 0) h += 360

    l = (cmax + cmin) / 2
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return [h, s, l]
}

// Used by hslToRgba
const hueToRgbValue = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
}

export const hslaToRgba = (hsla: HSLA): RGBA => {
    const [h, s, l, a] = validateHsla(hsla)

    let r = l
    let g = l
    let b = l

    if (s !== 0) {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hueToRgbValue(p, q, h + 1 / 3)
        g = hueToRgbValue(p, q, h)
        b = hueToRgbValue(p, q, h - 1 / 3)
    }

    return validateRgba([
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        a,
    ])
}

export const createColor = (colour: string | RGBA | { hsl: HSLA }): Color => {
    // Source of truth
    let rgba: RGBA

    // colour is a hex code
    if (typeof colour === 'string') {
        rgba = hexToRgba(colour)
    }
    // colour is rgb or rgba
    else if (Array.isArray(colour)) {
        rgba = validateRgba(colour)
    }
    else if (colour.hsl) {
        rgba = hslaToRgba(colour.hsl)
    }
    else {
        throw colourFormatErr
    }

    return {
        toRgba: () => rgba,
        toHsla: () => rgbaToHsla(rgba),
        toHex: () => rgbaToHex(rgba),
        toString: () => rgbaToHex(rgba),
        toJSON: () => rgba,
    }
}

export const mix = (color1: Color, color2: Color, weight = 0.5): Color => {
    const rgba1 = color1.toRgba()
    const rgba2 = color2.toRgba()

    const w = weight * 2 - 1
    const w1 = (w + 1) / 2.0
    const w2 = 1 - w1

    return createColor([
        Math.round(rgba1[0] * w1 + rgba2[0] * w2),
        Math.round(rgba1[1] * w1 + rgba2[1] * w2),
        Math.round(rgba1[2] * w1 + rgba2[2] * w2),
    ])
}