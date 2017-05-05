import groupBy from 'lodash.groupby'

import showsOptions from '../pages/shows.options.json'
import {getRandomArbitrary} from '../helpers/math.js'
import Model from './event.model'

const defaultState = []

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
    case 'RESET_EVENTS':
      newState = defaultState
      break
    case 'CREATE_EVENTS':
      action.payload.dateRange.forEach(date => {
        newState.push(new Model({date: date,}).toJSON())
      })
      break
    case 'UPDATE_EVENTS':
      newState = action.payload
      break
    case 'UPDATE_EVENT':
      const groupedShowOptions = groupBy(showsOptions, 'size')
      const index = newState.findIndex(
        event => event.id === action.payload.event.id
      )
      newState[index].cost = getRandomArbitrary(
        groupedShowOptions[newState[index].size][0].min_cost,
        groupedShowOptions[newState[index].size][0].max_cost
      )
      break
    case 'SIMULATE_EVENT':
      break
    default:
      break
  }
  return newState.map(event => new Model(event).toJSON())
}
