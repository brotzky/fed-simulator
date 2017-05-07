import showsOptions from '../pages/shows.options.json'
import {getRandomArbitrary} from '../helpers/math.js'
import {getDateRange} from '../helpers/get-date-range'
import LiveShowModel from './liveShow.model'

const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
const inProgress = false

const defaultState = {
  inProgress,
  firstDay,
  lastDay,
  currentDate: firstDay,
  dateRange: [],
  collection: [],
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
    case 'RESET_CALENDAR':
      newState = defaultState
      break
    case 'GENERATE_CALENDAR_LIVESHOWS':
      newState.collection = []
      newState.inProgress = true
      newState.dateRange.forEach(date => {
        newState.collection.push(new LiveShowModel({date: date,}).toJSON())
      })
      break
    case 'UPDATE_CALENDAR_LIVESHOWS':
      newState.collection = action.payload
      break
    case 'UPDATE_CALENDAR_LIVESHOW':
      const {show, dateIndex,} = action.payload
      const options = showsOptions.find(options => options.size === show.size)

      newState.collection[dateIndex].name = show.name
      newState.collection[dateIndex].size = show.size
      newState.collection[dateIndex].showId = show.id
      newState.collection[dateIndex].cost = getRandomArbitrary(
        options.min_cost,
        options.max_cost
      )
      break
    case 'SIMULATE_EVENT':
      break
    default:
      break
  }

  newState.dateRange = getDateRange(newState.firstDay, newState.lastDay)
  // newState.collection = newState.collection.map(show =>
  //   new LiveShowModel(show).toJSON()
  // )
  return newState
}
