import { getId } from "../helpers/hash"

const defaultState = []
const NOTIFICATION_TYPES = {
  // SIMULATE_RANDOM_MATCH: "Simulated Match",
}

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  if (action.type && NOTIFICATION_TYPES[action.type]) {
    state.push({ id: getId(), title: NOTIFICATION_TYPES[action.type], })
  }

  switch (action.type) {
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
