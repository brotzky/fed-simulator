import { List } from "immutable"

import { Show as Model } from "../models/show.model"
import { getId } from "../models/model.helper"

export default (state, action) => {
  state = List(state).map(item => new Model(item))
  let index

  switch (action.type) {
    case "RESET":
    case "RESET_SHOWS":
      state = List()
      break
    case "CREATE_SHOW":
      state = state.push(new Model(action.payload).merge({ id: getId(), }))
      break
    case "UPDATE_SHOW":
      index = state.findIndex(item => item.id === action.payload.id)

      if (index > -1) {
        state = state.updateIn([index,], item => new Model(item).merge(action.payload))
      }
      break
    case "DELETE_SHOW":
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
