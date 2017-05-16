import moment from "moment"

import Model from "./game.model"

const defaultState = new Model().toJSON()

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
    case "RESET_GAME":
      state = defaultState
      break
    case "UPDATE_GAME":
      state = Object.assign(state, action.payload)
      break
    case "ADD_ONE_MONTH":
      let currentDate = moment().set({
        year: state.currentYear,
        month: state.currentMonth,
        date: state.currentDate,
      })
      const nextMonth = moment(currentDate).add(1, "month").toDate()

      state.currentDate = nextMonth.getUTCDate()
      state.currentMonth = nextMonth.getUTCMonth()
      state.currentYear = nextMonth.getFullYear()
      break
    case "TOGGLE_PLAN":
      state.canPlan = !state.canPlan
      break

    default:
      break
  }

  let currentDate = moment().set({
    year: state.currentYear,
    month: state.currentMonth,
    date: state.currentDate,
    hour: 0,
    minute: 0,
    second: 1,
    millisecond: 0,
  })

  state.date = currentDate.utc().toDate()
  return new Model(state).toJSON()
}
