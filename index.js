import shuffle from 'array-shuffle'
import { zip } from './src/lib'
import raffle from './src/raffle'
import players from './src/players'
import teams from './src/teams'

const PLAYER_INTERVAL = 3000
const TEAM_INTERVAL = 2000

raffle({
  shuffler: () => zip(shuffle(players), shuffle(teams)),
  announcer: ([player, team]) => [
    {data: { team }, interval: TEAM_INTERVAL},
    {data: { player }, interval: PLAYER_INTERVAL}
  ],
  logger: ({team = 'Buscando Equipo...', player = 'Buscando DT...'}) =>
  `⚽️  ${team} 🙋‍♂️  ${player}`
})
