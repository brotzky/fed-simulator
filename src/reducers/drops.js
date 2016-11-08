import defaultState from "./drops.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "MOVE_DROP":
      newState.forEach((drop, key) => {
        if (Number(drop.id) === Number(action.dropId)) {
          newState[key].bucket = action.bucket.name
        }
      })
      break
      case "MOVE_DROPS_TO_DEFAULT":
        newState.forEach((drop, key) => {
          newState[key].bucket = "default"
        })
        break
      default:
        break
  }
  return newState
}
