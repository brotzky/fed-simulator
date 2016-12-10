import defaultState from "./championships.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state)),
    key = 0

  switch (action.type) {
    case "MOVE_CHAMPIONSHIP":
      key = newState.findIndex(championship => championship.id === action.championship.id)

      newState[key].wrestlers.push(action.wrestler)
      newState[key].brand = action.wrestler.brand

      let newLength = newState[key].wrestlers.length

      if ((newState[key].tag && newLength === 3) || (!newState[key].tag && newLength === 2)) {
        newState[key].wrestlers.shift()
      }
      break
    case "SHOULD_MOVE_CHAMPIONSHIP":
      newState.forEach((championship, key) => {
        championship.wrestlers.forEach((wrestler, wrestlerKey) => {
          if (wrestler.id === action.loser.id) {
            if (championship.canMoveBrands) {
              newState[key].brand = action.winner.brand
            }
            newState[key].changes++
            newState[key].wrestlers = newState[key].wrestlers.filter(wrestler => wrestler.id !== action.loser.id)
            newState[key].wrestlers.push(action.winner)
          }
        })
      })
      break
    case "CLEAR_CHAMPIONS":
        newState.forEach((championship, key) => {
          newState[key].wrestlers = []
        })
      break
    case "RESET_CHAMPIONS":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
