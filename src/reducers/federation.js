const defaultState = {
  name: '',
  size: 10,
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
      newState = defaultState
      break
    case 'UPDATE_FEDERATION':
      newState = action.federation
      break
    default:
      break
  }
  return newState
}
