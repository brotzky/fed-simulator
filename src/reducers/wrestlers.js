import defaultState from "./wrestlers.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "MOVE_WRESTLER":
      newState.forEach((wrestler, key) => {
        if (Number(wrestler.id) === Number(action.wrestlerId)) {
          newState[key].brand = action.brand.name
        }
      })
      break
      case "MOVE_All_WRESTLERS_TO_DEFAULT":
        newState.forEach((drop, key) => {
          newState[key].brand = "default"
        })
        break
      default:
        break
  }
  return newState
}
