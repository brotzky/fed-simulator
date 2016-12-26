import defaultState from "./shows.default"
import { randomiseWrestlers, simulateMatch } from "../helpers/match"
import { getRandomInt } from "../helpers/math"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "CREATE_SHOW":
      action.show.attendance = getRandomInt(
        action.show.PPV.attendance.min,
        action.show.PPV.attendance.max,
      )
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
    case "SELECT_PPV_FOR_SHOW":
      newState.forEach((show, key) => {
        newState[key].PPV = action.PPV
      })
      break
    case "SELECT_BRAND_FOR_SHOW":
      let index = newState.findIndex(show => show.id === action.showId)
      newState[index].brand = action.brand
      break
    case "RANDOMISE_SHOW":
      newState.forEach((show, key) => {
        if (show.id === action.showId) {
          let matches = new Array(action.numberOfMatches).fill({})
          matches.map(match => {
            match.wrestlers = randomiseWrestlers(action.wrestlers)
            return match
          })
          newState[key].matches = matches
        }
      })
      break
    case "SIMULATE_SHOW":
      let currentShow = newState.find(show => show.id === action.showId)

      currentShow.story = simulateMatch(currentShow.wrestlers, action.moves)
      break
    case "REMOVE_WRESTLER_FROM_MATCH":
      newState.forEach(show => {
        if (show.id === action.showId) {
          show.matches[action.matchIndex].wrestlers = show.matches[action.matchIndex].wrestlers.filter(wrestler => wrestler.id !== action.wrestlerId)
        }
      })
      break
    case "ADD_WRESTLER_TO_MATCH":
      newState.forEach(show => {
        console.log(show.id, action.showId)
        if (show.id === action.showId) {
          console.log("shows the same")
          show.matches[action.matchIndex].wrestlers.push(
            action.wrestler
          )
        }
      })
      break
    case "RESET_SHOW":
      newState.forEach((show, key) => {
        console.log(action.showId)
        if (show.id === action.showId) {
          newState[key].matches = []
        }
      })
      break
    case "RESET_SHOWS":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
