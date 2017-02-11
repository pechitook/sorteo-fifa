import shuffle from 'array-shuffle'
import players from './src/players'
import { zip, logPlayers } from './src/lib'
import fs from 'fs'

const shuffledPlayers = shuffle(players)
const bag1 = shuffledPlayers.slice(0, shuffledPlayers.length / 2)
const bag2 = shuffledPlayers.slice(shuffledPlayers.length / 2)
const result = zip(bag1, bag2)
fs.writeFile('./couples.json', JSON.stringify(result))

let roundCount = 1
result.map(([p1, p2]) => {
  logPlayers(p1, p2, roundCount)
  roundCount++
})
