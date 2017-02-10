import shuffle from 'array-shuffle'
import teams from './src/teams'
import { zip, logTeams } from './src/lib'

const couples = require('./couples.json')
const shuffledTeams = shuffle(teams)

let roundCount = 1
zip(couples, shuffledTeams).map(([couple, team]) => {
  logTeams(couple, team, roundCount)
  roundCount++
})
