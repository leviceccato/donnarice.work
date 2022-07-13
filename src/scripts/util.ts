export type NonEmptyArray<T> = [T, ...T[]]

export const clamp = (min: number, value: number, max: number): number =>
    Math.min(Math.max(value, min), max)

export const sleep = (duration: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, duration))
