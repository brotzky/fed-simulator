const defaultState = 2.1

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "CHECK_VERSION":
      newState = defaultState
      break
      default:
        break
  }
  return newState
}
