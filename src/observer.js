import ora from 'ora'

let task
let data = {}

const handlers = ({
    logger = () => data.toString(),
    startMsg = 'Comienza Sorteo!',
    endMsg = 'Powered By Chester'}
  ) => ({
    START_RAFFLE: () => {
      console.log(startMsg)
    },
    START: (position) => {
      data = {}
      task = ora(logger(data, position)).start()
    },
    SET: (position, newData) => {
      data = {...data, ...newData}
      task.text = logger(data, position)
    },
    END: (position) => {
      task.succeed()
    },
    END_RAFFLE: () => {
      console.log(endMsg)
    }
  })

export default (options) => {
  const configuredHandlers = handlers(options)
  return (item) => configuredHandlers[item.type](item.position, item.data)
}
