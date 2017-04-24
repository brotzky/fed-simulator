import defaultState from './federation.default.json'

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
      newState = defaultState
      break
    case 'UPDATE_FEDERATION':
      newState = action.payload
      break
    default:
      break
  }
  return newState
}