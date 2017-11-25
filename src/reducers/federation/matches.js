import { List } from "immutable"

import Model from "../../models/match.model"
import WrestlersReducer from "./match.wrestlers"

import { getId } from "../../models/model.helper"

export default (state, action) => {
  state = List(state)
  let index

  switch (action.type) {
    case "CREATE_MATCH":
      {
        const payload = action.payload || {}
        const id = action.payload.id ? action.payload.id : getId()

        state = state.push(new Model(payload).merge({ id, }))
      }
      break
    case "SIMULATE_MATCH":
      index = state.findIndex(item => item.id === action.payload)

      state = state.updateIn([index,], item => {
        item.simulated = true
        item.wrestlers = new WrestlersReducer(item.wrestlers, action)
        return item
      })
      break
    case "SELECT_WINNER_IN_MATCH":
      {
        const { matchId, } = action.payload

        index = state.findIndex(item => item.id === matchId)

        if (index > -1) {
          state = state.update(index, item => {
            item.wrestlers = new WrestlersReducer(item.wrestlers, action)
            return new Model(item).merge({ simulated: false, })
          })
        }
      }
      break
    case "REMOVE_WRESTLER_FROM_MATCH":
      {
        const { matchId, } = action.payload

        index = state.findIndex(item => item.id === matchId)

        if (index > -1) {
          state = state.update(index, item => {
            item.wrestlers = new WrestlersReducer(item.wrestlers, action)
            return new Model(item).merge({ simulated: false, })
          })
        }
      }
      break
    case "ADD_WRESTLER_TO_MATCH":
      {
        index = state.findIndex(item => item.id === action.payload.matchId)

        if (index > -1) {
          state = state.update(index, item => {
            return new Model(item).merge({
              simulated: false,
              wrestlers: new WrestlersReducer(item.wrestlers, action),
            })
          })
        }
      }
      break
    case "CLEAR_WRESTLERS_FROM_MATCH":
      index = state.findIndex(item => item.id === action.payload)

      state = state.updateIn([index,], item => {
        item.wrestlers = []
        return item
      })
      break
    case "RESET_MATCHES":
    case "RESET":
      state = List()
      break
  }
  return state.toJS()
}
