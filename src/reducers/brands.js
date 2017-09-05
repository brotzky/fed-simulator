import Model from "../models/brand.model"
import defaults from "../constants/defaults.json"

const defaultState = []

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  let index

  switch (action.type) {
    case "RESET":
    case "RESET_BRANDS":
      state = defaultState
      break
    case "GENERATE_FEDERATION":
    case "GENERATE_BRANDS":
			state = defaults.brands
      break
    case "CREATE_BRAND":
      state.push(action.payload)
      break
    case "UPDATE_BRAND":
      index = state.findIndex(brand => brand.id === action.payload.id)

      if (index > -1) {
        state[index] = action.payload
      }
      break
    case "DELETE_BRAND":
      index = state.findIndex(brand => brand.id === action.payload)

      if (index > -1) {
        state.splice(index, 1)
      }
      break
  }
  return state.length === 0 ? defaultState : state.map(newModel => new Model(newModel).toJSON())
}
