import { List } from "immutable"

import selectRandomResults from "../../helpers/select-random-results"
import Model from "../../models/match.wrestler.model"

export default (state, action) => {
  state = List(state)

  switch (action.type) {
    case "SIMULATE_MATCH":
      state = selectRandomResults(state.toJS())
      break
    case "SELECT_WINNER_IN_MATCH":
      state = state.map(item => {
        const isAlreadyWinner = item.winner
        const isWinner = !isAlreadyWinner && item.id === action.payload.wrestlerId

        item.winner = isWinner
        item.loser = false
        return new Model(item)
      })
      break
    case "REMOVE_WRESTLER_FROM_MATCH":
      state = state.filter(item => item.id !== action.payload.wrestlerId)
      state = state.map(item => {
        item.winner = false
        item.loser = false
        return item
      })
      break
    case "ADD_WRESTLER_TO_MATCH":
      {
        const newItem = new Model(action.payload.wrestler)

        state = state.filter(item => item.id !== newItem.get("id"))
        state = state.push(newItem)
      }
      break
  }
  return List(state).toJS()
}
