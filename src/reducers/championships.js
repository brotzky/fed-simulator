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
            // if (newState[key].history === undefined) {
            //   newState[key].history = []
            // }
            // newState[key].history.push({
            //   winner: action.wrestlerId,
            //   loser: newState[key].wrestlerId,
            // })
          }
        }
      })
      break
    case "SHOULD_MOVE_CHAMPIONSHIP":
      let movedOneChampionship = 0
      
      newState.forEach((championship, key) => {
        if (championship.wrestlerId === action.loser.id && action.winner.male === championship.male && movedOneChampionship === 0) {
          newState[key].wrestlerId = action.winner.id
          movedOneChampionship++

          // if (newState[key].history === undefined) {
          //   newState[key].history = []
          // }
          // newState[key].history.push({
          //   winner: action.winner.id,
          //   loser: action.loser.id,
          // })
        }
      })
      break
    case "CLEAR_CHAMPIONS":
        newState.forEach((championship, key) => {
          newState[key].wrestlerId = ""
          newState[key].wrestlerIds = []
        })
      break
    case "RESET_CHAMPIONS":
      newState = defaultState
      break
  }
  return newState
}
