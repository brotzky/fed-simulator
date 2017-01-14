const defaultState = []

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  const getIndexById = (id) => newState.findIndex(item => item.id === id)

  switch (action.type) {
    case "CREATE_WRESTLER":
      if (getIndexById(action.wrestler.id) < 0) {
        newState.push({
          ...action.wrestler,
        })
      }
      break
    case "UPDATE_WRESTLER":
      let index = getIndexById(action.wrestler.id)
      newState[index] = action.wrestler
      break
    case "CLEAR_WRESTLERS":
      let wrestlersBrand = []

      Object.keys(defaultState).map(index => {
        wrestlersBrand[newState[index].id] = defaultState[index].brand
      })

      newState.forEach((wrestler, key) => {
        newState[key].brand = wrestlersBrand[wrestler.id]
      })
      break
    case "MOVE_WRESTLER":
      newState.forEach((wrestler, key) => {
        if (Number(wrestler.id) === Number(action.wrestlerId)) {
          newState[key].brand = action.brand.name
        }
      })
      break
      case "AWARD_MATCH_POINTS":
        let loserIds = Object.keys(action.losers).map(f => action.losers[f].id)

        newState.forEach((wrestler, key) => {
          if (loserIds.includes(wrestler.id)) {
            newState[key].losses = newState[key].losses + 1
          } else if (wrestler.id === action.winner.id) {
            newState[key].wins = newState[key].wins + 1
          }
        })
        break
      case "MOVE_All_WRESTLERS_TO_DEFAULT":
        newState.forEach((drop, key) => {
          newState[key].brand = ""
        })
        break
      case "RESET_WRESTLERS":
      case "RESET":
          newState = defaultState
          break
      default:
        break
  }
  return newState
}
