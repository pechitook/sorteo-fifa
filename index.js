import { raffleTeams } from './src/raffler'
import logger from './src/logger'

const dataLog = ({team = 'Buscando Equipo...', player = 'Buscando DT...'}) =>
  `⚽️  ${team} 🙋‍♂️  ${player}`

raffleTeams().subscribe(logger({dataLog}))
