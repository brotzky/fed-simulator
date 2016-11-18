import defaultState from "./wrestlers.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "MOVE_WRESTLER":
      newState.forEach((drop, key) => {
        if (Number(drop.id) === Number(action.wrestlerId)) {
          newState[key].bucket = action.bucket.name
        }
      })
      break
      case "MOVE_All_WRESTLERS_TO_DEFAULT":
        newState.forEach((drop, key) => {
          newState[key].bucket = "default"
        })
        break
      default:
        break
  }
  return newState
}
