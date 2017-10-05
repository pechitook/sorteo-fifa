import shuffle from 'array-shuffle'
import { zip, shufflePairs } from '../core/lib'
import raffle from '../core/raffle'
import players from '../../data/players'
import teams from '../../data/teams'

const PLAYER_INTERVAL = 3000
const TEAM_INTERVAL = 2000

const run = () =>
  raffle({
    shuffler: () => zip(shufflePairs(players), shuffle(teams)),
    announcer: ([[player1, player2], team]) => [
      { data: { player1 }, interval: PLAYER_INTERVAL },
      { data: { player2 }, interval: PLAYER_INTERVAL },
      { data: { team }, interval: TEAM_INTERVAL }
    ],
    logger: ({
      team = 'Buscando Equipo...',
      player1 = '...',
      player2 = '...'
    }) => ` 🙋‍♂️ ${player1} juega con 🙋‍♂️ ${player2} => ${team}`
  })

export default {
  name: 'Copa Deby',
  run
}
