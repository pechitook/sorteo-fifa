import shuffle from 'array-shuffle'
import raffle from '../core/raffle'
import players from '../../data/players'
import { range, cycle, zip } from '../core/lib'

const shuffled = shuffle(players)
const roundCount = players.length % 2 == 0 ? players.length - 1 : players.length
const matchesPerRound = Math.floor(players.length / 2)

const fixtureShuffle = () => {
  return range(roundCount).flatMap(round => [
    { type: 'ROUND', value: round },
    ...range(matchesPerRound).map(match => ({
      type: 'GAME',
      value: generateMatch(players.length, round, match).map(i => shuffled[i])
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

function generateMatch(teamCount, round, match) {
  var home = teamCount + round - match
  var visit = teamCount + round + match

  if (teamCount % 2 == 0) {
      if (round < match - 1) {
          visit--
      }
      else if (round * 2 >= teamCount && round + match >= teamCount) {
          home++
      }
      else if (match - round == 1 || match + round == teamCount - 1) {
          home = round
          visit = teamCount - 1
      }
  }
  if (round % 2 == 0) {
      const aux = home
      home = visit
      visit = aux
  }
  home = home % teamCount
  visit = visit % teamCount

  return [ home, visit ]
}

export default {
  name: 'Fixture',
  run
}
