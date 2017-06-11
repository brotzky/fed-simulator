// import { getId } from "../helpers/hash"

const defaultState = []

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    // case "SIMULATE_MATCH":
    //   const id = getId()
    //
    //   state = state.concat({ action, id, })
    //   break
    case "RESET_NOTIFICATIONS":
    case "RESET":
      state = defaultState
      break
    case "REMOVE_NOTIFICATION":
      state = state.filter(
        notification => notification.id !== action.payload.notificationId
      )
      break
    default:
      break
  }
  return state
}
