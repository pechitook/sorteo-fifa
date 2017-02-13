import shuffle from 'array-shuffle'
import teams from './src/teams'
import { zip, logTeams } from './src/lib'

const couples = require('./couples.json')
const shuffledTeams = shuffle(teams)

let roundCount = 1
let logging = Promise.resolve();
zip(couples, shuffledTeams).map(([couple, team]) => {
  logging = logging.then( () => { return logTeams(couple, team, roundCount) });
  roundCount++
})

logging.then(() => console.log("\nPowered by Chester"))
