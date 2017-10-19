import { List } from "immutable"
import { getId } from "../models/model.helper"

import Model, { schema } from "../models/notification.model"

export const NOTIFICATION_TYPES = {
  CREATE_WRESTLER: "Created wrestler",
  CREATE_BRAND: "Created brand",
  TOGGLE_SIMULATION: "Toggled match simulation",
  UPDATE_STYLE: "Updated style",
}

export default (state, action) => {
  state = List(state).map(item => new Model(item))
  let index

  if (action.type && NOTIFICATION_TYPES[action.type]) {
    const newItem = Object.assign({}, schema, { title: NOTIFICATION_TYPES[action.type], id: getId(), })

    state = state.push(newItem)
  }

  switch (action.type) {
    case "RESET_NOTIFICATIONS":
    case "RESET":
      state = List()
      break
    case "DELETE_NOTIFICATION":
      index = state.findIndex(item => item.id === action.payload.id)

      if (index > -1) {
        state = state.delete(index)
      }
      break
  }

  return List(state)
    .map(item => new Model(item))
    .toJS()
}
