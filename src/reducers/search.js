const defaultState = String()

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SEARCH":
      state = action.query
      break
    default:
      break
  }
  return state
}
