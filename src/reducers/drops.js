import defaultState from "./drops.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'MOVE_DROP':
      let drop = {
        name: action.dropName,
      }
      newState.forEach((drop, key) => {
        if (drop.name === action.dropName) {
          newState[key].bucket = action.bucketName
        }
      })
      return newState
      default:
    break
  }
  return newState
}
