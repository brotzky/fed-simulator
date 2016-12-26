import defaultState from "./shows.default"
import { randomiseWrestlers, simulateMatch } from "../helpers/match"
import { getRandomInt } from "../helpers/math"

const getAttendance = (min, max) => getRandomInt(min, max)

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state)),
    index = 0
  const getShowIndexById = (id) => newState.findIndex(show => show.id === id)

  switch (action.type) {
    case "CREATE_SHOW":
      action.show.attendance = getAttendance(
        action.show.PPV.attendance.min,
        action.show.PPV.attendance.max,
      )
      action.show.matches = Array.from({length: 12}).fill({})
      newState.push(
        action.show
      )
      break
    case "DELETE_SHOW":
      newState = newState.filter(show => show.id !== action.showId)
      break
    case "UPDATE_SHOW":
      newState.map(show => {
        if (show.id === action.show.id) {
          show = Object.assign(action.show, show)
        }
        return show
      })
      break
    case "SELECT_PPV_FOR_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].PPV = action.PPV
      break
    case "SELECT_BRAND_FOR_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].brand = action.brand
      break
    case "RANDOMISE_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].matches.forEach((match, key) => {
        newState[index].matches[key].wrestlers = randomiseWrestlers(action.wrestlers)
      })
      break
    case "SIMULATE_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].matches.forEach((match, matchKey) => {
        newState[index].matches[matchKey].story = simulateMatch(match.wrestlers, action.moves)
      })
      break
    case "REMOVE_WRESTLER_FROM_MATCH":
      index = getShowIndexById(action.showId)
      newState[index].matches[action.matchIndex].wrestlers = newState[index].matches[action.matchIndex].wrestlers.filter(wrestler => wrestler.id !== action.wrestler.id)
      break
    case "ADD_WRESTLER_TO_MATCH":
      newState.map(show => {
        if (show.id === action.showId) {
          if (!show.matches[action.matchIndex].wrestlers) {
            show.matches[action.matchIndex].wrestlers = []
          }
          show.matches[action.matchIndex].wrestlers.push(
            action.wrestler
          )
        }
        return show
      })
      break
    case "RESET_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].matches = []
      break
    case "RESET_SHOWS":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
