import defaultState from "./settings.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "SHOW_STORY_BY_DEFAULT":
      newState.SHOW_STORY_BY_DEFAULT = !newState.SHOW_STORY_BY_DEFAULT
      break
    case "RESET":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
