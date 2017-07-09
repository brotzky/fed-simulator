const defaultState = 5

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "CHECK_VERSION":
      break
    default:
      break
  }
  return state
}
