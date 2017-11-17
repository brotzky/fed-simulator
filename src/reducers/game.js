import Model from "../models/game.model"

export default (state, action) => {
  state = new Model(state)

  switch (action.type) {
    case "RESET":
    case "RESET_GAME":
      state = new Model()
      break
    case "GENERATE":
      state = state.set("name", "WWE")
      state = state.set("started", true)
      break
    case "TOGGLE_STARTED":
    case "START_GAME":
      state = state.set("started", true)
      break
    case "UPDATE_NAME":
      state = state.set("name", action.payload.name)
      break
  }

  return new Model(state).toJS()
}
