import weighted from "weighted"
import groupBy from "lodash.groupby"

import WrestlerModel from "./wrestler.model"
import Model from "./match.model"
import { getId } from "../helpers/hash"

const defaultState = []
const defaultAction = {}
const arrayOfLength = length => new Array(length).fill(1 / length)

export default (state = defaultState, action = defaultAction) => {
  state = JSON.parse(JSON.stringify(state))
  let index = false

  const getIndexById = id => state.findIndex(match => match.id === id)

  switch (action.type) {
    case "CREATE_MATCH":
      state.push(new Model(action.payload).toJSON())
      break
    case "SIMULATE_MATCH":
      index = getIndexById(action.payload.matchId)

      if (index > -1) {
        const { wrestlers, } = state[index]
        const teams = groupBy(wrestlers, "teamId")

        const numberOfTeams = Object.keys(teams).length
        const numberOfWrestlers = wrestlers.length

        const hasWinner = wrestlers.findIndex(wrestler => wrestler.winner) > -1
        const wrestlerRandomWeighting = arrayOfLength(wrestlers.length)

        if (numberOfWrestlers > 1 && numberOfTeams > 1) {
          const winner = hasWinner
            ? wrestlers.find(wrestler => wrestler.winner)
            : weighted.select(wrestlers, wrestlerRandomWeighting)

          const losers = wrestlers.filter(
            loser => loser.teamId !== winner.teamId
          )
          const losersRandomWeighting = arrayOfLength(losers.length)
          const loser = weighted.select(losers, losersRandomWeighting)

          const newWrestlers = wrestlers.map(wrestler => {
            wrestler.loser = false
            wrestler.winner = false

            if (wrestler.id === winner.id) {
              wrestler.winner = true
            } else if (wrestler.id === loser.id) {
              wrestler.loser = true
            }

            return wrestler
          })

          state[index].wrestlers = newWrestlers
        }
      }
      break

    case "SELECT_WINNER_IN_MATCH":
      index = getIndexById(action.payload.matchId)

      state[index].wrestlers = state[index].wrestlers.map(newWrestler => {
        const isAlreadyWinner = newWrestler.winner
        const isWinningWrestler = newWrestler.id === action.payload.wrestlerId

        newWrestler.winner = isWinningWrestler && !isAlreadyWinner
        newWrestler.loser = false

        return newWrestler
      })
      break

    case "REMOVE_WRESTLER_FROM_MATCH":
      index = getIndexById(action.payload.matchId)

      state[index].wrestlers = state[index].wrestlers.filter(
        newWrestler => newWrestler.id !== action.payload.wrestlerId
      )
      break

    case "ADD_WRESTLER_TO_MATCH":
      state.map(currentMatch => {
        if (currentMatch.id === action.payload.matchId) {
          const wrestlerExists = currentMatch.wrestlers.findIndex(
            wrestler => wrestler.id === action.payload.wrestler.id
          )

          if (wrestlerExists === -1) {
            const teamId = action.payload.wrestler.teamId
              ? action.payload.wrestler.teamId
              : getId()

            action.payload.wrestler.teamId = teamId

            currentMatch.wrestlers.push(
              new WrestlerModel(action.payload.wrestler).toJSON()
            )
          } else {
            currentMatch.wrestlers[wrestlerExists].teamId =
              action.payload.wrestler.teamId
          }
        }
        return currentMatch
      })
      break

    case "RESET_MATCHES":
    case "RESET":
      state = defaultState
      break

    default:
      break
  }

  return state
}
