import defaultState from "./championships.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "MOVE_CHAMPIONSHIP":
      newState.forEach((championship, key) => {
        if (Number(championship.id) === Number(action.championship.id)) {
          newState[key].wrestlerId = action.wrestlerId
        }
      })
      break
  }
  return newState
}
