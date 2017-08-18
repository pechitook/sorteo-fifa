import observer from './observer'
import { Observable } from 'rx'
import { flatMap } from './lib'

const dataObservable = (position) => ({data, interval}) => {
  return Observable.of({type: 'SET', data, position}).delay(interval)
}
const raffleSequence = (items) =>
  Observable.of({type: 'START_RAFFLE'})
    .concat(...items)
    .concat(Observable.of({type: 'END_RAFFLE'}))

const itemSequence = (announcer) => (valueItems) =>
  flatMap((item, position) => [
    Observable.of({type: 'START', position}),
    ...announcer(item, position).map(dataObservable(position)),
    Observable.of({type: 'END', position})
  ], valueItems)

export default ({shuffler, announcer, logger}) => {
  raffleSequence(
    itemSequence(announcer)(shuffler())
  ).subscribe(observer({logger}))
}
