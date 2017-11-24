const defaultState = 5.5

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "CHECK_VERSION":
      break
  }
  return state
}
