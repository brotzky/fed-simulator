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
  dustbins: [],
  boxes: [],
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
      // newState = Object.assign(newState, action.payload)
      // we need min and max cost to generate a cost
      const options = showsOptions.find(
        show => show.size === action.payload.size
      )
      // we need the show
      let liveShow = newState.collection.find(
        liveShow => Date(liveShow.date) === Date(action.payload.date)
      )
      // if this show exists
      if (liveShow && options) {
        const size = liveShow.size
        // generate a random cost
        liveShow.cost = getRandomArbitrary(
          options[size].min_cost,
          options[size].max_cost
        )
      }
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
