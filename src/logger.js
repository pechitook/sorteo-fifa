import ora from 'ora'

let task
let data = {}

const handlers = ({
    dataLog = () => data.toString(),
    startMsg = 'Comienza Sorteo!',
    endMsg = 'Powered By Chester'}
  ) => ({
    START_RAFFLE: () => {
      console.log(startMsg)
    },
    START: (initialData = {}) => {
      data = initialData
      task = ora(dataLog(data)).start()
    },
    SET: (newData) => {
      data = {...data, ...newData}
      task.text = dataLog(data)
    },
    END: () => {
      task.succeed()
    },
    END_RAFFLE: () => {
      console.log(endMsg)
    }
  })

export default (options) => {
  const configuredHandlers = handlers(options)
  return (item) => configuredHandlers[item.type](item.data)
}
