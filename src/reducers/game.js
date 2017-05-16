import moment from "moment"

import Model from "./game.model"

const defaultState = new Model().toJSON()

// const firstDay = moment().startOf("month").utc().toDate()
// const lastDay = moment().endOf("month").utc().toDate()
// const inProgress = false
// const isComplete = false
// state.dateRange = getDateRange(state.firstDay, state.lastDay)

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "UPDATE_GAME":
      state = Object.assign(state, action.payload)
      break
    case "ADD_ONE_MONTH":
      const currentDate = Date(
        `${state.currentDate}/${state.currentMonth}/${state.currentYear}`
      )
      const nextMonth = moment(currentDate).add(1, "month").toDate()

      state.currentDate = new Date(nextMonth).getUTCDate()
      state.currentMonth = new Date(nextMonth).getUTCMonth()
      state.currentYear = new Date(nextMonth).getFullYear()
      break
    case "TOGGLE_PLAN":
      state.canPlan = !state.canPlan
      break

    default:
      break
  }

  const currentDate = moment().set({
    year: state.currentYear,
    month: state.currentMonth,
    date: state.currentDate,
  })

  state.date = currentDate.utc().toDate()
  return new Model(state).toJSON()
}
