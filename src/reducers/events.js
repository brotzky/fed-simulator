import groupBy from 'lodash.groupby'

import showsOptions from '../pages/shows.options.json'
import {getRandomArbitrary} from '../helpers/math.js'
import {getDateRange} from '../helpers/get-date-range'
import Model from './event.model'

const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
const inProgress = false

const defaultState = {
  inProgress,
  firstDay,
  lastDay,
  currentDate: firstDay,
  droppedBoxNames: [],
  dateRange: [],
  collection: [],
  dustbins: [],
  boxes: [],
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
    case 'RESET_EVENTS':
      newState = defaultState
      break
    case 'CREATE_EVENTS':
      newState.dateRange.forEach(date => {
        newState.collection.push(new Model({date: date,}).toJSON())
      })
      break
    case 'UPDATE_EVENTS':
      newState.collection = action.payload
      break
    case 'UPDATE_EVENT':
      const groupedShowOptions = groupBy(showsOptions, 'size')
      const index = newState.collection.findIndex(
        event => event.id === action.payload.event.id
      )
      newState.collection[index].cost = getRandomArbitrary(
        groupedShowOptions[newState.collection[index].size][0].min_cost,
        groupedShowOptions[newState.collection[index].size][0].max_cost
      )
      break
    case 'SIMULATE_EVENT':
      break
    default:
      break
  }

  newState.dateRange = getDateRange(newState.firstDay, newState.lastDay)
  newState.collection = newState.collection.map(event =>
    new Model(event).toJSON()
  )
  return newState
}
