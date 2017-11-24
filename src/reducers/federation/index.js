import { List } from "immutable"

import Championships from "./championships"
import Roster from "./roster"
import Matches from "./matches"
import Brands from "./brands"

const defaultState = {
  championships: [],
  roster: [],
  matches: [],
  brands: [],
}

export default (state = defaultState, action) => {
  const getState = key => state[key]

  state.championships = Championships(state.championships, action, getState)
  state.brands = Brands(state.brands, action, getState)
  state.matches = Matches(state.matches, action, getState)
  state.roster = Roster(state.roster, action, getState)

  return state
}
