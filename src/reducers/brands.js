import { List } from "immutable"
import uniqid from "uniqid"

import { schema } from "../models/brand.model"
import { brands } from "../constants/defaults.json"

export default (state, action) => {
  state = List(state)
  let index

  switch (action.type) {
    case "RESET":
    case "RESET_BRANDS":
      state = List()
      break
    case "GENERATE_FEDERATION":
    case "GENERATE_BRANDS":
      state = List(brands)
      break
    case "CREATE_BRAND":
      {
        const newBrand = Object.assign({}, schema, action.payload, { id: uniqid(), })

        state = state.push(newBrand)
      }
      break
    case "UPDATE_BRAND":
      {
        index = state.findIndex(brand => brand.id === action.payload.id)

        const newItem = Object.assign({}, schema, state[index], action.payload)

        state = state.set(index, newItem)
      }
      break
    case "DELETE_BRAND":
      {
        const { payload: brandId, } = action

        index = state.findIndex(brand => brand.id === brandId)

        state = state.delete(index)
      }
      break
  }
  return state.toJS()
}
