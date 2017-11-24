import { List } from "immutable"

import { getId } from "../../models/model.helper"
import Model from "../../models/wrestler.model"
import { roster } from "../../constants/defaults.json"

import Match from "../../helpers/match"

export default (state, action, getState) => {
  state = List(state).map(item => new Model(item))
  let index

  switch (action.type) {
    case "RESET":
    case "RESET_ROSTER":
      state = List()
      break
    case "GENERATE":
    case "GENERATE_ROSTER":
      state = List(roster.map(item => new Model(item)))
      break
    case "DELETE_WRESTLER":
      index = state.findIndex(item => item.id === action.payload)

      if (index > -1) {
        state = state.delete(index)
      }
      break
    case "CREATE_WRESTLER":
      state = state.push(new Model(action.payload).merge({ id: getId(), }))
      break
    case "UPDATE_WRESTLER":
      index = state.findIndex(item => item.id === action.payload.id)

      if (index > -1) {
        state = state.updateIn([index,], item => new Model(item).merge(action.payload))
      }
      break
    case "SIMULATE_RANDOM_MATCHES":
      {
        let { amountOfMatches, } = action.payload

        while (amountOfMatches > 0) {
          state = new Match({ roster: state, })
            .generate()
            .simulate()
            .savePoints()
            .getRoster()
          amountOfMatches--
        }
      }
      break
  }
  return List(state)
    .map(item => new Model(item))
    .toJS()
}
