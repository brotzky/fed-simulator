import Model from "./wrestler.model"
import defaults from "../constants/defaults.json"
import { getRandomArbitrary } from "../helpers/points"

const defaultState = []

const POINT_CHANGE_PER_MATCH = 1

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))
  let wrestlerIndex, winnerIndex, loserIndex

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "GENERATE_FEDERATION":
    case "GENERATE_ROSTER":
      state = defaultState
      defaults.roster.forEach(item => {
        let newItem = item.list
          .split(",")
          .filter(name => name.length > 2)
          .filter(String)
          .map(name => {
            const points = getRandomArbitrary(item.min, item.max)
            const cost = points * 150

            return {
              name,
              male: item.male,
              points,
              cost,
            }
          })

        state = state.concat(newItem)
      })
      break
    case "UPDATE_ROSTER":
      state = action.payload
      state.map(wrestler => {
        wrestler.name = wrestler.name.trim()
        return wrestler
      })
      break
    case "REMOVE_WRESTLER":
      wrestlerIndex = state.findIndex(
        wrestler => wrestler.id === action.payload.id
      )

      if (wrestlerIndex > -1) {
        state.splice(wrestlerIndex, 1)
      }
      break
    case "UPDATE_WRESTLER":
      wrestlerIndex = state.findIndex(
        wrestler => wrestler.id === action.payload.id
      )

      if (wrestlerIndex > -1) {
        state[wrestlerIndex] = Object.assign(
          {},
          state[wrestlerIndex],
          action.payload
        )
      }
      break
    case "SIMULATE_RANDOM_MATCH":
      winnerIndex = getRandomArbitrary(1, state.length)
      loserIndex = getRandomArbitrary(1, state.length)

      if (state[winnerIndex] && state[loserIndex]) {
        state[winnerIndex].points += 1
        state[loserIndex].points -= 1

        state[winnerIndex].wins += 1
        state[loserIndex].losses += 1
      }
      break
    case "CONFIRM_SIMULATED_MATCH":
      const { winner, loser, } = action.payload

      winnerIndex = state.findIndex(wrestler => wrestler.id === winner.id)
      loserIndex = state.findIndex(wrestler => wrestler.id === loser.id)

      if (winnerIndex) {
        state[winnerIndex].points += POINT_CHANGE_PER_MATCH
        state[winnerIndex].wins += POINT_CHANGE_PER_MATCH

        state[loserIndex].points -= POINT_CHANGE_PER_MATCH
        state[loserIndex].losses += POINT_CHANGE_PER_MATCH
      }
      break
    default:
      break
  }
  return state.map(wrestler => new Model(wrestler).toJSON())
}
