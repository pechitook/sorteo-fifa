import shuffle from 'array-shuffle'

export const zip = (a, b) => a.map((el, i) => [el, b[i]])

export const split = arr => [
  arr.slice(0, arr.length / 2),
  arr.slice(arr.length / 2)
]

export const tail = arr => arr.slice(1, arr.length)

export const init = arr => arr.slice(0, arr.length - 1)

export const shufflePairs = arr => {
  const arrSets = split(shuffle(arr))
  return zip(arrSets[0], arrSets[1])
}

const concat = (x, y) => x.concat(y)
export const flatMap = (f, xs) => xs.map(f).reduce(concat, [])

export const dropLast = (number, arr) => arr.slice(0, arr.length - number)

export const takeLast = (number, arr) =>
  arr.slice(arr.length - number, arr.length)

export const cycle = (arr, offset) => [
  ...arr.slice(offset % arr.length, arr.length),
  ...arr.slice(0, offset % arr.length)
]

export const range = (length, init = 1) =>
  [...Array(length).keys()].map(x => x + init)
