import defaults from "../constants/defaults.json"
import Model from "./show.model"

const defaultState = []

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "UPDATE_SHOWS":
      state = action.payload
      break
    case "GENERATE_FEDERATION":
    case "GENERATE_SHOWS":
      defaults.shows.forEach(item => {
        let newItem = item.list
          .split(",")
          .filter(name => name.length > 2)
          .filter(String)
          .map(name => {
            return {
              name: name.trim(),
              size: item.size,
              frequency: item.frequency,
            }
          })

        state = state.concat(newItem)
      })
      break
    default:
      break
  }
  return state.map(show => new Model(show).toJSON())
}
