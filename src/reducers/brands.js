import { List } from "immutable"

import Model from "../models/brand.model"
import { getId } from "../models/model.helper"
import { brands } from "../constants/defaults.json"

export default (state, action) => {
  state = List(state).map(item => new Model(item))
  let index

  switch (action.type) {
    case "RESET":
    case "RESET_BRANDS":
      state = List()
      break
    case "GENERATE":
    case "GENERATE_BRANDS":
      state = List(brands.map(item => new Model(item)))
      break
    case "CREATE_BRAND":
      state = state.push(new Model(action.payload).merge({ id: getId(), }))
      break
    case "UPDATE_BRAND":
      index = state.findIndex(item => item.id === action.payload.id)

      if (index > -1) {
        state = state.updateIn([index,], item => new Model(item).merge(action.payload))
      }
      break
    case "DELETE_BRAND":
      index = state.findIndex(item => item.id === action.payload)

      if (index > -1) {
        state = state.delete(index)
      }
      break
  }

  return List(state)
    .map(item => new Model(item))
    .toJS()
}
