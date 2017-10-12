import shuffle from 'array-shuffle'
import raffle from '../core/raffle'
import players from '../../data/players'
import { split, tail, zip, range, cycle, flatMap } from '../core/lib'

const fixtureShuffle = () => {
  const generateRound = teams => round => {
    const [home, away] = split([
      teams[0],
      ...cycle(tail(teams), round * teams.length / 2)
    ])
    return [
      { type: 'ROUND', value: round },
      ...zip(home, away.reverse()).map((players, index) => ({
        type: 'GAME',
        value: index === 0 && round % 2 !== 0 ? players.reverse() : players
      }))
    ]
  }

  const shuffled = shuffle(players)
  if (shuffled.length % 2 !== 0) shuffled.splice(0, 0, 'LIBRE')
  const numRounds = shuffled.length - 1

  return flatMap(generateRound(shuffled), range(numRounds))
}

const INTERVALS = {
  ROUND: 2000,
  GAME: 0
}

const logFuncs = {
  EMPTY: () => `...`,
  ROUND: (number = '...') => `Fecha ${number}`,
  GAME: ([player1 = '...', player2 = '...']) =>
    player1 === 'LIBRE'
      ? `🙋‍‍♂️  ${player2} LIBRE`
      : player2 === 'LIBRE'
        ? `🙋‍‍♂️  ${player1} LIBRE`
        : `🙋‍♂️  ${player1} VS 🙋‍♂️  ${player2}`
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
