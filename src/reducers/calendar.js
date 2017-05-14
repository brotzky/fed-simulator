import moment from "moment"

import showsOptions from "../constants/shows.options.json"
import { getRandomArbitrary } from "../helpers/math.js"
import { getDateRange } from "../helpers/get-date-range"
import Model from "./liveShow.model"

const firstDay = moment().startOf("month").utc().toDate()
const lastDay = moment().endOf("month").utc().toDate()
const inProgress = false
const isComplete = false

const defaultState = {
  isComplete,
  inProgress,
  firstDay,
  lastDay,
  currentDate: firstDay,
  dateRange: [],
  collection: [],
}

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "RESET":
    case "RESET_CALENDAR":
      console.log("it got reset;")
      state = defaultState
      break
    case "DELETE_CALENDAR_LIVESHOW":
      state.collection = state.collection.map(liveShow => {
        if (liveShow.date === action.payload) {
          liveShow = Object.assign(liveShow, {
            name: "",
            cost: "",
            showId: false,
          })
        }
        return liveShow
      })
      break
    case "GENERATE_CALENDAR_LIVESHOWS":
      state.collection = []
      state.inProgress = true
      state.dateRange.forEach(date => {
        state.collection.push(new Model({ date: date, }).toJSON())
      })
      break
    case "START_CALENDAR_MONTH":
      state.collection = []
      state.inProgress = true
      state.isComplete = false
      const firstDay = moment(state.firstDay)
        .startOf("month")
        .add(1, "M")
        .toDate()
      console.log(firstDay)
      // state.firstDay = moment(state.firstDay)
      //   .startOf("month")
      //   .add(1, "M")
      //   .toDate()
      // state.lastDay = moment(state.firstDay).endOf("month").toDate()
      // state.currentDay = state.firstDay
      // state.dateRange.forEach(date => {
      //   state.collection.push(new Model({ date: date, }).toJSON())
      // })
      break
    case "UPDATE_CALENDAR_LIVESHOWS":
      state.collection = action.payload
      break
    case "SIMULATE_CALENDAR_LIVESHOWS":
      state.collection = state.collection.map(liveShow => {
        const options = showsOptions.find(
          options => options.size === liveShow.size
        )
        liveShow.isCompleted = true
        liveShow.gross = getRandomArbitrary(
          options.min_gross,
          options.max_gross
        )
        liveShow.rating = getRandomArbitrary(1, 10)
        return liveShow
      })
      state = Object.assign(state, {
        isComplete: true,
        currentDay: state.lastDay,
      })
      break
    case "UPDATE_CALENDAR_LIVESHOW":
      const { show, dateIndex, } = action.payload
      const options = showsOptions.find(options => options.size === show.size)

      if (state.collection[dateIndex]) {
        state.collection[dateIndex] = Object.assign(
          state.collection[dateIndex],
          {
            name: show.name,
            size: show.size,
            showId: show.id,
            cost: getRandomArbitrary(options.min_cost, options.max_cost),
          }
        )
      }
      break
    case "SIMULATE_EVENT":
      break
    default:
      break
  }

  state.dateRange = getDateRange(state.firstDay, state.lastDay)
  state.collection = state.collection.map(liveShow =>
    new Model(liveShow).toJSON()
  )
  return state
}
