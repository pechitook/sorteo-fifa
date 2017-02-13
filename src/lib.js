import chalk from 'chalk'
import Listr from 'Listr'
const INTERVAL = 5 * 100
const WAIT_TIME = 2 * 1000 // must be lower than interval

export const zip = (a, b) => a.map((el, i) => [el, b[i]])

const logTeam = (team) => chalk.bold.yellow(`${team}`)
const logPlayer = (player) => chalk.bold.cyan(`${player}`)
const logCouple = (couple) => chalk.bold.cyan(`${couple.join(' - ')}`)

export const log = (team, player, roundCount) => {
  const tasks = new Listr([
    {
        title: '⚽️  🙋‍♂️  ',
        task: (ctx, task) => {
            return new Observable(observer => {
                observer.next('Buscando equipo...')

                setTimeout(() => {
                  task.title = `⚽️  ${logTeam(team)} 🙋‍♂️`
                  observer.next('Buscando DT...')
                }, INTERVAL * roundCount)

                setTimeout(() => {
                    task.title = `⚽️  ${logTeam(team)} 🙋‍♂️ ${logPlayer(player)}`
                    observer.complete()
                }, (INTERVAL * roundCount) + WAIT_TIME)
            })
        }
    }
  ])

  return tasks.run()
}

export const logPlayers = (p1, p2, roundCount) => {
  const tasks = new Listr([
    {
        title: '🙋‍♂️  ',
        task: (ctx, task) => {
            return new Observable(observer => {
                observer.next('Buscando primer jugador...')

                setTimeout(() => {
                  task.title = `🙋‍♂️ ${logPlayer(p1)}`
                  observer.next('Buscando segundo jugador...')
                }, INTERVAL * roundCount)

                setTimeout(() => {
                    task.title = `🙋‍♂️ ${logPlayer(`${p1} - ${p2}`)}`
                    observer.complete()
                }, (INTERVAL * roundCount) + WAIT_TIME)
            })
        }
    }
  ])

  return tasks.run()
}

export const logTeams = (couple, team, roundCount) => {
  const tasks = new Listr([
    {
        title: '🙋‍♂️ ⚽️ ',
        task: (ctx, task) => {
            return new Observable(observer => {
                observer.next('Buscando pareja...')

                setTimeout(() => {
                  task.title = `🙋‍♂️  ${logCouple(couple)} ⚽️  `
                  observer.next('Buscando equipo...')
                }, INTERVAL * roundCount)

                setTimeout(() => {
                    task.title = `🙋‍♂️  ${logCouple(couple)} ⚽️  ${logTeam(team)}`
                    observer.complete()
                }, (INTERVAL * roundCount) + WAIT_TIME)
            })
        }
    }
  ])

  return tasks.run()
  // setTimeout(() => logCouple(couple), INTERVAL * roundCount)
  // setTimeout(() => logTeam(`${team} \n`), (INTERVAL * roundCount) + WAIT_TIME)
}
