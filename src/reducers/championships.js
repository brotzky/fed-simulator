import defaultState from "./championships.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "MOVE_CHAMPIONSHIP":
      newState.forEach((championship, key) => {
        if (Number(championship.id) === Number(action.championship.id)) {
          if (championship.tag) {
            if (newState[key].wrestlerIds.length > 1) {
              newState[key].wrestlerIds.shift()
            }
            newState[key].wrestlerIds.push(action.wrestlerId)
          } else {
            newState[key].wrestlerId = action.wrestlerId
          }
        }
      })
      break
    case "CHECK_CHAMPIONSHIP":
      newState.forEach((championship, key) => {
        if (championship.wrestlerId === action.loser.id) {
          newState[key].wrestlerId = action.winner.id
        }
      })
      break
    case "CLEAR_SELECTED_CHAMPIONS":
        newState.forEach((championship, key) => {
          newState[key].wrestlerId = ""
          newState[key].wrestlerIds = []
        })
      break
  }
  return newState
}
