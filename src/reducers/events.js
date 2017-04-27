const defaultState = []

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
      newState = defaultState
      break
    case 'CREATE_EVENT':
      break
    case 'SIMULATE_EVENT':
      break
    default:
      break
  }
  return newState
}
