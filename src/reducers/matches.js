import weighted from "weighted"
import groupBy from "lodash.groupby"

import WrestlerModel from "./wrestler.model"
import Model from "./match.model"
import { getId } from "../helpers/hash"
import { getPercentageAmount } from "../helpers/math"
import { randomiseWrestlers } from "../helpers/randomise-wrestlers.js"

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
    case "CONFIRM_SIMULATED_MATCH":
      index = getIndexById(action.payload.matchId)

      if (index > -1) {
        state[index].simulated = true
      }
      break
    case "GENERATE_RANDOM_MATCHES":
      let amountOfMatches = action.payload.amountOfMatches || 100

      while (amountOfMatches > 0) {
        const selectedWrestlers = randomiseWrestlers({
          wrestlers: action.payload.roster,
        })

        state.push(
          new Model({ generated: true, wrestlers: selectedWrestlers, }).toJSON()
        )
        amountOfMatches--
      }
      break
    case "SIMULATE_GENERATED_RANDOM_MATCHES":
      state.map(currentMatch => {
        if (!currentMatch.simulate) {
          const { wrestlers, } = currentMatch
          const winner = wrestlers[Math.floor(Math.random() * wrestlers.length)]

          const winnerTeamId = winner.teamId

          const losers = wrestlers.filter(
            wrestler => wrestler.teamId !== winnerTeamId
          )

          const loser = losers[Math.floor(Math.random() * losers.length)]

          if (!loser) {
            return
          }

          const loserIndex = wrestlers.findIndex(
            wrestler => wrestler.id === loser.id
          )

          const winnerIndex = wrestlers.findIndex(
            wrestler => wrestler.id === winner.id
          )

          currentMatch.wrestlers[winnerIndex].winner = true
          currentMatch.wrestlers[loserIndex].loser = true
        }
        currentMatch.simulated = true
        return currentMatch
      })
      break
    case "SIMULATE_MATCH":
      index = getIndexById(action.payload.matchId)

      if (index > -1) {
        const { wrestlers, } = state[index]
        const teams = groupBy(wrestlers, "teamId")

        const numberOfTeams = Object.keys(teams).length
        const numberOfWrestlers = wrestlers.length

        const hasWinner = wrestlers.findIndex(wrestler => wrestler.winner) > -1
        let weightedWrestlers = arrayOfLength(wrestlers.length)

        let lowest = wrestlers.sort((a, b) => a.points > b.points)[0],
          highest = wrestlers
            .filter(wrestler => wrestler.id !== lowest.id)
            .sort((a, b) => a.points < b.points)[0],
          lowestId = lowest.id,
          highestId = highest.id,
          lowestIndex = wrestlers.findIndex(
            wrestler => wrestler.id === lowestId
          ),
          highestIndex = wrestlers.findIndex(
            wrestler => wrestler.id === highestId
          ),
          highestAttackersPercentageGain = getPercentageAmount(
            weightedWrestlers[lowestIndex],
            20
          )

        if (lowest.points !== highest.points) {
          weightedWrestlers[lowestIndex] =
            weightedWrestlers[lowestIndex] - highestAttackersPercentageGain
          weightedWrestlers[highestIndex] =
            weightedWrestlers[highestIndex] + highestAttackersPercentageGain
        }

        if (numberOfWrestlers > 1 && numberOfTeams > 1) {
          const winner = hasWinner
            ? wrestlers.find(wrestler => wrestler.winner)
            : weighted.select(wrestlers, weightedWrestlers)

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

      state[index].simulated = false
      break

    case "REMOVE_WRESTLER_FROM_MATCH":
      index = getIndexById(action.payload.matchId)

      state[index].wrestlers = state[index].wrestlers.filter(
        newWrestler => newWrestler.id !== action.payload.wrestlerId
      )
      state[index].simulated = false
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
          currentMatch.simulated = false
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
