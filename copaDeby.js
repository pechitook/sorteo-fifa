import shuffle from 'array-shuffle'
import { zip, shufflePairs } from './src/lib'
import raffle from './src/raffle'
import players from './data/players'
import teams from './data/teams'

const PLAYER_INTERVAL = 3000
const TEAM_INTERVAL = 2000

raffle({
  shuffler: () => zip(
    shufflePairs(players),
    shuffle(teams)
  ),
  announcer: ([[player1, player2], team]) => [
    {data: { player1 }, interval: PLAYER_INTERVAL},
    {data: { player2 }, interval: PLAYER_INTERVAL},
    {data: { team }, interval: TEAM_INTERVAL}
  ],
  logger: ({team = 'Buscando Equipo...', player1 = '...', player2 = '...'}) =>
  ` 🙋‍♂️ ${player1} juega con 🙋‍♂️ ${player2} => ${team}`
})
