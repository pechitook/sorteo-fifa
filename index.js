import inquirer from 'inquirer'
import * as raffles from './src/raffles'

const raffleOptions = () => Object.keys(raffles).map(
    (key) => ({name: raffles[key].name, value: key})
)

inquirer.prompt([
  {
    type: 'list',
    name: 'raffle',
    message: 'Que sorteo hace falta?',
    choices: raffleOptions()
  }
])
.then(function (answers) {
  raffles[answers.raffle].run()
})
