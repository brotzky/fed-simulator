import moment from "moment"

import Model from "../models/game.model"

const defaultState = new Model().toJSON()

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
    case "RESET_GAME":
      state = defaultState
      break
    case "GENERATE_FEDERATION":
      state.name = "WWE"
      state.started = true
      state.cash = 400000000
      state.size = "lg"
      break
    case "START_GAME":
      state.started = true
      break
    case "TOGGLE_ANIMATIONS":
      state = Object.assign({}, state, { animations: !state.animations, })
      break
    case "UPDATE_GAME":
      state = Object.assign({}, state, action.payload)
      break
    case "ADD_ONE_MONTH":
      let currentDate = moment().set({
        year: state.currentYear,
        month: state.currentMonth,
        date: state.currentDate,
      })
      const nextMonth = moment(currentDate).add(1, "month").toDate()

      state.currentDate = nextMonth.getDate()
      state.currentMonth = nextMonth.getMonth()
      state.currentYear = nextMonth.getFullYear()
      break
    case "TOGGLE_PLAN":
      state.canPlan = !state.canPlan
      break
    case "ADD_PROFIT":
      state.cash = state.cash + Number(action.payload)
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

  state.date = currentDate.toDate()
  return new Model(state).toJSON()
}
