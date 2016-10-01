import chalk from 'chalk'

const INTERVAL = 5 * 1000
const PLAYER_WAIT_TIME = 2 * 1000 // must be lower than interval

export const zip = (a, b) => a.map((el, i) => [el, b[i]]);

const logTeam = (team) => console.log(chalk.bold.yellow(`⚽️  ${team}`))
const logPlayer = (player) => console.log(chalk.bold.cyan(`🙋‍♂️  ${player} \n`))

export const log = (team, player, roundCount) => {
  setTimeout(() => logTeam(team), INTERVAL * roundCount)
  setTimeout(() => logPlayer(player), (INTERVAL * roundCount) + PLAYER_WAIT_TIME)
}
