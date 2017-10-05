import shuffle from 'array-shuffle'
import raffle from '../core/raffle'
import players from '../../data/players'
import { range, cycle, zip } from '../core/lib'

const fixtureShuffle = () => {
  const shuffled = shuffle(players)
  return range(shuffled.length - 1).flatMap(value => [
    { type: 'ROUND', value: value },
    ...zip(shuffled, cycle(shuffled, value)).map(matchPlayers => ({
      type: 'GAME',
      value: matchPlayers
    }))
  ])
}

const INTERVALS = {
  ROUND: 2000,
  GAME: 0
}

const logFuncs = {
  EMPTY: () => `...`,
  ROUND: (number = '...') => `Fecha ${number}`,
  GAME: ([player1 = '...', player2 = '...']) =>
    `🙋‍♂️  ${player1} VS 🙋‍♂️  ${player2}`
}

const run = () =>
  raffle({
    shuffler: fixtureShuffle,
    announcer: data => [{ data, interval: INTERVALS[data.type] }],
    logger: ({ type = 'EMPTY', value = {} }) => logFuncs[type](value)
  })

export default {
  name: 'Fixture',
  run
}
