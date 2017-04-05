import shuffle from 'array-shuffle'
import players from './src/players'
import { logGarcaSorteo } from './src/lib'

const shuffledPlayers = shuffle(players)

let roundCount = 1
let logging = Promise.resolve()
shuffledPlayers.map((player) => {
  logging = logging.then( () => { return logGarcaSorteo(player, roundCount) })
  roundCount++
})

logging.then(() => console.log("\nPowered by Chester"))
