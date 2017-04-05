import shuffle from 'array-shuffle'
import norte from './src/norte'
import sur from './src/sur'
import { zip, logPlayers } from './src/lib'
import fs from 'fs'

const result = zip(shuffle(norte), shuffle(sur))

let roundCount = 1
let logging = Promise.resolve()
result.map(([p1, p2]) => {
  logging = logging.then( () => logPlayers(p1, p2, roundCount))
  roundCount++
})

logging.then(() => console.log("\nPowered by Chester"))
