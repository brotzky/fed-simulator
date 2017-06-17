import weighted from "weighted"
import minBy from "lodash.minby"
import groupBy from "lodash.groupby"

import WrestlerModel from "./wrestler.model"
import Model from "./match.model"
import { getId } from "../helpers/hash"
import Moves from "./moves.json"
import { getPercentageAmount } from "../helpers/math"

const defaultState = []
const defaultAction = {}

const getWrestlersWeights = arrayLength =>
  new Array(arrayLength).fill(1 / arrayLength)

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

        if (wrestlers.length > 1 && Object.keys(teams).length > 1) {
          let winner = wrestlers.find(wrestler => wrestler.winner)
          winner = winner
            ? winner
            : weighted.select(wrestlers, getWrestlersWeights(wrestlers.length))

          const loser = wrestlers.filter(
            wrestler =>
              wrestler.id !== winner.id &&
              (wrestler.teamId === null || wrestler.teamId !== winner.teamId)
          )

          state[index].winner = winner
          state[index].loser = loser
        }
      }
      break

    case "SELECT_WINNER_IN_MATCH":
      index = getIndexById(action.payload.matchId)

      let winner

      state[index].wrestlers.map(newWrestler => {
        const isAlreadyWinner = newWrestler.winner
        winner = newWrestler.id === action.payload.wrestlerId

        newWrestler.winner = winner

        if (isAlreadyWinner && winner) {
          newWrestler.winner = false
        }

        return newWrestler
      })
      state[index].winner = winner
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
