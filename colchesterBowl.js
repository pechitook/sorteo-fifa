import { colchesterBowlRaffle } from './src/raffler'
import logger from './src/logger'

const logFuncs = {
  SAVED: (player) => `El próximo que se salva es 🙋‍♂️  ${player}`,
  LAST: (player) => `El ULTIMO que se salva es 🙋‍♂️  ${player}`,
  DOOMED: (player) => `JUEGA EL COLCHESTER BOWL 🙋‍♂️  ${player}`
}

const dataLog = ({player = '...', type = 'SAVED'}) =>
  logFuncs[type](player)

colchesterBowlRaffle().subscribe(logger({dataLog}))
