import Model from "./style.model"
import chromatism from "chromatism"

const defaultState = new Model().toJSON()

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "GENERATE_FEDERATION":
      state.unTouched = false
      break
    case "UPDATE_STYLE":
      state = new Model(action.payload).toJSON()

      if (state.color === state.backgroundColor) {
        state.color = chromatism.complementary(state.backgroundColor).hex
      }
      state.unTouched = false
      break
    default:
      break
  }
  return new Model(state).toJSON()
}
