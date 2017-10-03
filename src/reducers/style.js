import { Map, fromJS } from "immutable"
import chromatism from "chromatism"

import { schema } from "../models/style.model"
import { shade } from "../helpers/colours"

export default (state = schema, action) => {
  state = Map(fromJS(state))

  switch (action.type) {
    case "RESET":
      state = Map(fromJS(schema))
      break
    case "GENERATE_FEDERATION":
      state.set("untouched", false)
      break
    case "UPDATE_STYLE":
      state = state.merge(action.payload, { untouched: false })
      state.get("darkBgColor", shade(
        state.get("backgroundColor"),
        state.get("shade")
      ))

      if (state.get("color") === state.get("backgroundColor")) {
        const color = chromatism.complementary(state.get("backgroundColor")).hex

        state.set("color", color)
      }
      break
    default:
      break
  }
  return state.toJS()
}
