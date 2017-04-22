import defaultState from './roster.default.json'

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
      newState = defaultState
      break
    case 'UPDATE_ROSTER':
      break
    default:
      break
  }
  return newState
}
