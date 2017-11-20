import { List } from "immutable"

import { getId } from "../models/model.helper"
import Model from "../models/wrestler.model"
import { roster } from "../constants/defaults.json"
import includes from "lodash.includes"

export default (state, action) => {
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
      state = state.push(new Model(action.payload).merge({ id: getId() }))
      break
    case "UPDATE_WRESTLER":
      index = state.findIndex(item => item.id === action.payload.id)

      if (index > -1) {
        state = state.updateIn([index], item => new Model(item).merge(action.payload))
      }
      break
    case "STORE_MATCH_DATA":
      {
        let bouts = Object.assign([], action.payload.matches)
        let championships = Object.assign([], action.payload.championships)
        bouts = bouts.filter(item => !item.resultStored && item.simulated)

        bouts.forEach(bout => {
          let championship
          const boutWinner = bout.wrestlers.find(item => item.winner)
          const boutLoser = bout.wrestlers.find(item => item.loser)

          const winner = state.find(item => item.id === boutWinner.id).toJS()
          const loser = state.find(item => item.id === boutLoser.id).toJS()

          const winnerIds = bout.wrestlers.reduce((prev, curr) => (curr.teamId === boutWinner.teamId ? prev.concat(curr.id) : prev), [])
          const loserIds = bout.wrestlers.reduce((prev, curr) => (curr.teamId === boutLoser.teamId ? prev.concat(curr.id) : prev), [])

          if (loser.championshipId) {
            championship = championships.find(item => item.id === loser.championshipId)
          }

          state = state.map(item => {
            const switchChampionship = championship && ((championship.tag === true && loserIds.length === 2) || (loserIds.length === 1 && !championship.tag))

            if (includes(loserIds, item.id)) {
              item = item.set("losses", item.get("losses") + 1)

              if (switchChampionship) {
                item = item.set("championshipId", null)
              }
            } else if (includes(winnerIds, item.id)) {
              item = item.set("wins", item.get("wins") + 1)

              if (switchChampionship) {
                item = item.set("championshipId", championship.id)
              }
            }

            return item
          })
        })
      }
      break
  }
  return List(state)
    .map(item => new Model(item))
    .toJS()
}
