import shuffle from 'array-shuffle'
import players from './players'
import teams from './teams'
import { Observable } from 'rx'
import { zip, flatMap, dropLast, takeLast } from './lib'

const PLAYER_INTERVAL = 3000
const TEAM_INTERVAL = 2000
const COLCHESTER_INTERVAL = 10000

export const raffleTeams = () => {
  const raffle = zip(shuffle(players), shuffle(teams))
  const itemEvents = ([player, team]) => [
    Observable.of({type: 'START'}),
    Observable.of({type: 'SET', data: { team }}).delay(TEAM_INTERVAL),
    Observable.of({type: 'SET', data: { player }}).delay(PLAYER_INTERVAL),
    Observable.of({type: 'END'})
  ]
  return Observable.of({type: 'START_RAFFLE'})
    .concat(...flatMap(itemEvents, raffle))
    .concat(Observable.of({type: 'END_RAFFLE'}))
}

export const colchesterBowlRaffle = () => {
  const raffle = shuffle(players)
  const saved = dropLast(3, raffle)
  const dangerZone = takeLast(3, raffle)

  const itemEvents = (type = 'SAVED', interval = PLAYER_INTERVAL) => (player) => [
    Observable.of({type: 'START', data: {type}}),
    Observable.of({type: 'SET', data: {player}}).delay(interval),
    Observable.of({type: 'END'})
  ]
  return Observable.of({type: 'START_RAFFLE'})
    .concat(...flatMap(itemEvents(), saved))
    .concat(...itemEvents('LAST', COLCHESTER_INTERVAL)(dangerZone[0]))
    .concat(...itemEvents('DOOMED', 0)(dangerZone[1]))
    .concat(...itemEvents('DOOMED', 0)(dangerZone[2]))
    .concat(Observable.of({type: 'END_RAFFLE'}))
}
