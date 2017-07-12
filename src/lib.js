export const zip = (a, b) => a.map((el, i) => [el, b[i]])

const concat = (x, y) => x.concat(y)
export const flatMap = (f, xs) => xs.map(f).reduce(concat, [])

export const dropLast = (number, arr) => arr.slice(0, arr.length - number)

export const takeLast = (number, arr) => arr.slice(arr.length - number, arr.length)
