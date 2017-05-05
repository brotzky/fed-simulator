const defaultState = []

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case 'RESET':
    case 'RESET_CALENDAR':
      newState = defaultState
      break
    case 'UPDATE_CALENDAR':
      newState = action.payload
      break
    default:
      break
  }
  return newState
}
