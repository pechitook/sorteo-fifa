import shuffle from 'array-shuffle'
import teams from './src/teams'
import players from './src/players'
import { zip, log } from './src/lib'

const shuffledTeams = shuffle(teams)
const shuffledPlayers = shuffle(players)

let roundCount = 1
zip(shuffledTeams, shuffledPlayers).map(([team, player]) => {
  log(team, player, roundCount)
  roundCount++
})
