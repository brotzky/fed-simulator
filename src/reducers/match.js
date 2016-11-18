const defaultState = {
  wrestlers: []
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "TOGGLE_WRESTLER_TO_MATCH":
      let ids = Object.keys(newState.wrestlers).map(f=>newState.wrestlers[f].id)
      if (ids.includes(action.wrestler.id)) {
        newState.wrestlers = newState.wrestlers.filter((wrestler) => wrestler.id !== action.wrestler.id)
      } else {
        newState.wrestlers.push(action.wrestler)
      }
      break
      default:
        break
  }
  return newState
}
