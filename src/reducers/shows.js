import defaultState from "./shows.default"
import weighted from "weighted"
import { randomiseWrestlers, simulateMatch } from "../helpers/match"
import { getRandomInt } from "../helpers/math"

const getAttendance = (min, max) => getRandomInt(min, max)
const createEmptyMatches = () => Array.from({length: 12}).fill({isTagMatch: false})
const tag = {
  options: [true, false],
  weights: [0.1, 0.9],
}

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
      action.show.matches = createEmptyMatches()
      newState.push(
        action.show
      )
      break
    case "DELETE_SHOW":
      newState = newState.filter(show => show.id !== action.showId)
      break
    case "SELECT_DATE_FOR_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].date = action.date
      break
    case "SELECT_PPV_FOR_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].PPV = action.PPV
      break
    case "SELECT_BRAND_FOR_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].brand = action.brand
      break
    case "SELECT_WINNER_IN_MATCH":
      index = getShowIndexById(action.showId)
      newState[index].matches[action.matchIndex].wrestlers.forEach((wrestler, wrestlerKey) => {
        newState[index].matches[action.matchIndex].wrestlers[wrestlerKey].winner = (wrestler.id === action.wrestler.id && !newState[index].matches[action.matchIndex].wrestlers[wrestlerKey].winner)
      })
      break
    case "RANDOMISE_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].matches.forEach((match, key) => {
        newState[index].matches[key].story = []
        newState[index].matches[key].isTagMatch = weighted.select(tag.options, tag.weights)
        newState[index].matches[key].wrestlers = randomiseWrestlers({
          wrestlers: action.wrestlers,
          isTagMatch: newState[index].matches[key].isTagMatch,
        })
      })
      break
    case "SIMULATE_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].matches.forEach((match, matchKey) => {
        if (match.wrestlers && match.wrestlers.length > 1) {
          newState[index].matches[matchKey].story = simulateMatch(match.wrestlers, action.moves)
        }
      })
      break
    case "REMOVE_WRESTLER_FROM_MATCH":
      index = getShowIndexById(action.showId)
      newState[index].matches[action.matchIndex].wrestlers = newState[index].matches[action.matchIndex].wrestlers.filter(wrestler => wrestler.id !== action.wrestler.id)
      if (newState[index].matches[action.matchIndex].wrestlers.length === 0) {
        newState[index].matches[action.matchIndex] = {}
      }
      break
    case "ADD_WRESTLER_TO_MATCH":
      newState.map(show => {
        if (show.id === action.showId) {
          if (!show.matches[action.matchIndex].wrestlers) {
            show.matches[action.matchIndex].wrestlers = []
          }
          action.wrestler.winner = false
          action.wrestler.teamId = action.teamId
          show.matches[action.matchIndex].wrestlers.push(
            action.wrestler
          )
        }
        return show
      })
      break
    case "SET_TAG_MATCH":
      index = getShowIndexById(action.showId)
      newState[index].matches[action.matchIndex] = {
        wrestlers: [],
        isTagMatch: action.isTagMatch,
        story: [],
      }
      break
    case "RESET_SHOW":
      index = getShowIndexById(action.showId)
      newState[index].matches = createEmptyMatches()
      break
    case "RESET_SHOWS":
    case "RESET":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
