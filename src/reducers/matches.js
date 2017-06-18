import weighted from "weighted"
import minBy from "lodash.minby"

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

      if (index !== -1) {
        state[index].story = []
        const { wrestlers, } = state[index]

        if (wrestlers.length > 1) {
          const lowest = wrestlers.sort((a, b) => a.damage > b.damage)[0]
          const highest = wrestlers
            .filter(wrestler => wrestler.id !== lowest.id)
            .sort((a, b) => a.damage < b.damage)[0]
          const lowestId = lowest.id
          const highestId = highest.id
          const lowestIndex = wrestlers.findIndex(
            wrestler => wrestler.id === lowestId
          )
          const highestIndex = wrestlers.findIndex(
            wrestler => wrestler.id === highestId
          )
          const attackersWeights = getWrestlersWeights(wrestlers.length)
          const highestAttackersPercentageGain = getPercentageAmount(
            attackersWeights[lowestIndex],
            20
          )

          if (lowest.damage !== highest.damage) {
            attackersWeights[lowestIndex] -= highestAttackersPercentageGain
            attackersWeights[highestIndex] += highestAttackersPercentageGain
          }

          while (minBy(wrestlers, "damage").damage > 0) {
            let defender
            const attacker = weighted.select(wrestlers, attackersWeights)
            const defenders = wrestlers.filter(
              wrestler =>
                wrestler.id !== attacker.id &&
                (wrestler.teamId === null ||
                  wrestler.teamId !== attacker.teamId)
            )

            // multi-man match, choose a defender
            if (defenders.length > 1) {
              const defendersWeights = getWrestlersWeights(defenders.length)

              defender = weighted.select(defenders, defendersWeights)
            } else {
              defender = defenders[0]
            }

            const defenderIndex = wrestlers.findIndex(
              wrestler => defender.id === wrestler.id
            )
            const attackerIndex = wrestlers.findIndex(
              wrestler => attacker.id === wrestler.id
            )

            // select the move we'll be using
            const moveWeights = Moves.reduce((a, b) => a.concat(b.weight), [])
            const move = weighted.select(Moves, moveWeights)
            const hasWinner =
              wrestlers.findIndex(wrestler => wrestler.winner) > -1

            state[index].wrestlers[defenderIndex].damage -= move.damage

            const loserDamage = state[index].wrestlers[defenderIndex].damage

            if (!hasWinner) {
              state[index].wrestlers[attackerIndex].winner = loserDamage < 1
              state[index].wrestlers[defenderIndex].winner = false
            }

            state[index].winner = attacker
            state[index].loser = defender

            state[index].story.push({
              id: getId(),
              attacker,
              defender,
              move,
            })
          }
          state[index].wrestlers.map(wrestler => {
            wrestler.damage = 100
            return wrestler
          })
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
