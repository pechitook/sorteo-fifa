import shuffle from 'array-shuffle'
import teams from './src/teams'
import players from './src/players'
import { zip, log } from './src/lib'
import Promise from 'bluebird';

const shuffledTeams = shuffle(teams)
const shuffledPlayers = shuffle(players)

let roundCount = 1
let logging = Promise.resolve();
zip(shuffledTeams, shuffledPlayers).map(([team, player]) => {
  logging = logging.then( () => { return log(team, player, roundCount) });
  roundCount++
})

logging.then(() => console.log("\nPowered by Chester"))
