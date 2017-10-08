import { Map, fromJS } from "immutable"

import { schema } from "../models/game.model"

export default (state = schema, action) => {
  state = Map(fromJS(state))

  switch (action.type) {
    case "RESET":
    case "RESET_GAME":
      state = Map(fromJS(schema))
      break
    case "GENERATE_FEDERATION":
      state = state.set("name", "WWE")
      state = state.set("started", true)
      break
    case "START_GAME":
      state = state.set("started", true)
      break
    case "TOGGLE_ANIMATIONS":
      state = state.set("animations", !state.get("animations"))
      break
    case "UPDATE_GAME":
      state = state.merge(action.payload, schema)
      break
    default:
      break
  }

  return state.toJS()
}
