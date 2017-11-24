import { List } from "immutable"

import { Championship as Model } from "../../models/championship.model"
import { getId } from "../../models/model.helper"
import { championships } from "../../constants/defaults.json"

export default (state, action, getState) => {
  state = List(state).map(item => new Model(item))
  let index

  switch (action.type) {
    case "RESET":
    case "RESET_CHAMPIONSHIPS":
      state = List()
      break
    case "GENERATE":
    case "GENERATE_CHAMPIONSHIPS":
      state = List(championships.map(item => new Model(item)))
      break
    case "CREATE_CHAMPIONSHIP":
      state = state.push(new Model(action.payload).merge({ id: getId() }))
      break
    case "UPDATE_CHAMPIONSHIP":
      index = state.findIndex(item => item.id === action.payload.id)

      if (index > -1) {
        state = state.updateIn([index], item => new Model(item).merge(action.payload))
      }
      break
    case "AWARD_CHAMPIONSHIP":
      {
        index = state.findIndex(item => item.id === action.payload.id)

        if (index > -1) {
          const { wrestlerId } = action.payload

          let item = state.get(index)

          let wrestlers = Object.assign([], item.wrestlers)

          if (item.tag) {
            wrestlers = [wrestlerId, item.wrestlers[0]]
          } else if (!item.tag) {
            wrestlers = [wrestlerId]
          }

          const switches = item.get("switches") + 1

          state = state.updateIn([index], item => new Model(item).merge({ wrestlers, switches }))
        }
      }
      break
    case "DELETE_CHAMPIONSHIP":
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
