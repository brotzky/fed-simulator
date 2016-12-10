import defaultState from "./championships.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "MOVE_CHAMPIONSHIP":
      newState.forEach((championship, key) => {
        if (championship.id === action.championship.id) {

          if (championship.tag) {
            newState[key].wrestlers.push(action.wrestler)

            if (newState[key].wrestlers.length > 1) {
              newState[key].wrestlers.pop()
            }

          } else {
            newState[key].wrestlers = [
              {...action.wrestler}
            ]
          }
        }
      })
      break
    case "SHOULD_MOVE_CHAMPIONSHIP":
      let movedOneChampionship = 0

      newState.forEach((championship, key) => {
        if (championship.wrestlers[0] && championship.wrestlers[0].id && championship.wrestlers[0].id === action.loser.id && action.winner.male === championship.male && movedOneChampionship === 0) {
          newState[key].wrestlers = [
            {...action.winner}
          ]
          movedOneChampionship++
        }
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
  }
  return newState
}
