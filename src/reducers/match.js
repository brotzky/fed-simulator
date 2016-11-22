const defaultState = {
  wrestlers: [],
  story: [],
  wrestlersIds: [],
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {

    case "CLEAR_SELECTED_WRESTLERS":
      newState = defaultState
      break

    case "SIMULATE_MATCH":
      newState.story = action.story
      break

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
  newState.wrestlersIds = Object.keys(newState.wrestlers).map(f => newState.wrestlers[f].id)
  return newState
}
