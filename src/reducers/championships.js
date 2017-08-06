const defaultState = []
import Model from "./championship.model"
import defaults from "../constants/defaults.json"
import { getRandomArbitrary } from "../helpers/points"

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "UPDATE_CHAMPIONS":
      state = action.payload
      state.map(item => {
        item.name = item.name.trim()
        return item
      })
      break
    case "GENERATE_FEDERATION":
    case "GENERATE_CHAMPIONSHIPS":
      defaults.championships.forEach(item => {
        let newItem = item.list
          .split(",")
          .filter(name => name.length > 2)
          .filter(String)
          .map(name => {
            return {
              name: name.trim(),
              male: item.male,
            }
          })

        state = state.concat(newItem)
      })
      break
    default:
      break
  }
  return state.map(championship => new Model(championship).toJSON())
}
