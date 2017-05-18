import showsOptions from "../constants/shows.options.json"
import { getRandomArbitrary } from "../helpers/math.js"
import { getDateRange } from "../helpers/get-date-range"
import Model from "./liveShow.model"

const defaultState = []

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
    case "RESET_CALENDAR":
      state = defaultState
      break
    case "DELETE_CALENDAR_LIVESHOW":
      state = state.map(liveShow => {
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
    case "UPDATE_CALENDAR_LIVESHOWS":
      state = action.payload
      break
    case "GENERATE_CALENDAR_LIVESHOWS":
      const { month, year, } = action.payload

      state = []

      const firstDate = new Date(year, month, 1, 0, 0, 0, 0)
      const lastDate = new Date(year, month + 1, 0)
      const dateRange = getDateRange(firstDate, lastDate)

      dateRange.forEach(date => {
        state.push(new Model({ date: date, }).toJSON())
      })
      break
    case "SIMULATE_CALENDAR_LIVESHOWS":
      state = state.map(liveShow => {
        const options = showsOptions.find(
          options => options.size === liveShow.size
        )
        liveShow.canPlan = false
        liveShow.gross = getRandomArbitrary(
          options.min_gross,
          options.max_gross
        )
        liveShow.rating = getRandomArbitrary(1, 10)
        return liveShow
      })
      break
    case "UPDATE_CALENDAR_LIVESHOW":
      const { show, date, } = action.payload
      const options = showsOptions.find(options => options.size === show.size)
      const dateIndex = state.findIndex(liveShow => liveShow.date === date)

      if (state[dateIndex]) {
        state[dateIndex] = Object.assign(state[dateIndex], {
          name: show.name,
          size: show.size,
          showId: show.id,
          cost: getRandomArbitrary(options.min_cost, options.max_cost),
        })
      }
      break
    case "SIMULATE_EVENT":
      break
    default:
      break
  }

  state = state.map(liveShow => new Model(liveShow).toJSON())
  return state
}
