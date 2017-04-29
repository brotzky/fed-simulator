const defaultState = []
import Model from './event.model'

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
      newState = defaultState
      break
    case 'CREATE_EVENTS':
      const {dateRange, firstDay, lastDay,} = action.payload

      dateRange.forEach(date => {
        newState.push(new Model({date: date,}).toJSON())
      })

      console.log(dateRange, firstDay, lastDay)
      break
    case 'SIMULATE_EVENT':
      break
    default:
      break
  }
  return newState.map(event => new Model(event).toJSON())
}
