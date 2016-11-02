import defaultState from "./drops.default"
defaultState.forEach((drop, key) => {
  defaultState[key].bucket = "default"
})

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'MOVE_DROP':
      let drop = {
        name: action.dropName,
      }
      newState.forEach((drop, key) => {
        if (drop.name === action.dropName) {
          newState[key].brand = action.bucketName
        }
      })
      return newState
      default:
    break
  }
  return newState
}
