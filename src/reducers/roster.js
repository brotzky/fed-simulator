import Model from "./wrestler.model"

const defaultState = []

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "UPDATE_ROSTER":
      state = action.payload
      state.map(wrestler => {
        wrestler.name = wrestler.name.trim()
        return wrestler
      })
      break
    default:
      break
  }
  return state.map(wrestler => new Model(wrestler).toJSON())
}
