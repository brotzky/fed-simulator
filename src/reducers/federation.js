import Model from "./federation.model"
const defaultState = new Model().toJSON()

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "UPDATE_FEDERATION":
      state = action.payload
      break
    default:
      break
  }
  return new Model(state).toJSON()
}
