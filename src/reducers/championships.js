import defaultState from "./championships.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state)),
    getIndexById = (id) => newState.findIndex(item => item.id === id),
    key = 0

  switch (action.type) {
    case "UPDATE_CHAMPIONSHIP":
      let index = getIndexById(action.championship.id)
      newState[index] = action.championship
      break
    case "MOVE_CHAMPIONSHIP":
      key = newState.findIndex(championship => championship.id === action.championship.id)
      newState[key].wrestlers.push(action.wrestler)
      newState[key].brand = action.wrestler.brand
      newState[key].changes++

      let newLength = newState[key].wrestlers.length

      if ((newState[key].tag && newLength === 3) || (!newState[key].tag && newLength === 2)) {
        newState[key].wrestlers.shift()
      }
      break
    case "SHOULD_MOVE_CHAMPIONSHIP":
      newState.forEach((championship, key) => {
        let numberOfLosers = newState[key].wrestlers.filter(wrestler => wrestler.id === action.loser.id).length

        if (numberOfLosers > 0) {
          if (newState[key].canMoveBrands) {
            newState[key].brand = action.winner.brand
          }

          console.log(`${action.loser.name} lost the ${championship.name} to ${action.winner.name}`)
          newState[key].changes++
          newState[key].wrestlers = newState[key].wrestlers.filter(wrestler => wrestler.id !== action.loser.id)
          newState[key].wrestlers.push({
            ...action.winner
          })
        }
      })
      break
    case "CLEAR_CHAMPIONS":
        newState.forEach((championship, key) => {
          newState[key].wrestlers = []
        })
      break
    case "RESET_CHAMPIONS":
    case "RESET":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
