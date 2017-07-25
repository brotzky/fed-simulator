import Model from "./wrestler.model"

const defaultState = []

const POINT_CHANGE_PER_MATCH = 1

export default (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "RESET":
      state = defaultState
      break
    case "UPDATE_ROSTER":
      state = action.payload
      state.map(wrestler => {
        wrestler.name = wrestler.name.trim()
        return wrestler
      })
      break
    case "UPDATE_WRESTLER":
      const wrestlerIndex = state.findIndex(
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
    case "CONFIRM_SIMULATED_MATCH":
      const { winner, loser, } = action.payload

      const winnerIndex = state.findIndex(wrestler => wrestler.id === winner.id)
      const loserIndex = state.findIndex(wrestler => wrestler.id === loser.id)

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
