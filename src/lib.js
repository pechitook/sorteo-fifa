import chalk from 'chalk'

const INTERVAL = 5 * 1000
const WAIT_TIME = 2 * 1000 // must be lower than interval

export const zip = (a, b) => a.map((el, i) => [el, b[i]])

const logTeam = (team) => console.log(chalk.bold.yellow(`⚽️  ${team}`))
const logPlayer = (player) => console.log(chalk.bold.cyan(`🙋‍♂️  ${player}`))
const logCouple = (couple) => console.log(chalk.bold.cyan(`🙋‍♂️  ${couple.join(' - ')}`))

export const log = (team, player, roundCount) => {
  setTimeout(() => logTeam(team), INTERVAL * roundCount)
  setTimeout(() => logPlayer(`${player} \n`), (INTERVAL * roundCount) + WAIT_TIME)
}

export const logPlayers = (p1, p2, roundCount) => {
  setTimeout(() => logPlayer(p1), INTERVAL * roundCount)
  setTimeout(() => logPlayer(`${p2} \n`), (INTERVAL * roundCount) + WAIT_TIME)
}

export const logTeams = (couple, team, roundCount) => {
  setTimeout(() => logCouple(couple), INTERVAL * roundCount)
  setTimeout(() => logTeam(`${team} \n`), (INTERVAL * roundCount) + WAIT_TIME)
}
