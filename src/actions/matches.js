import * as types from "./types"
import { SIMULATE_MATCHES_AMOUNT } from "../constants/game"

export function createMatch(payload) {
  return {
    type: types.CREATE_MATCH,
    payload,
  }
}

export function simulateRandomMatches(amountOfMatches = SIMULATE_MATCHES_AMOUNT) {
  return {
    type: types.SIMULATE_RANDOM_MATCHES,
    payload: { amountOfMatches, },
  }
}

export function simulateMatch(matchId) {
  return {
    type: types.SIMULATE_MATCH,
    payload: matchId,
  }
}

export function removeWrestlerFromMatch({ matchId, wrestlerId, }) {
  return {
    type: types.REMOVE_WRESTLER_FROM_MATCH,
    payload: { matchId, wrestlerId, },
  }
}

export function addWrestlerToMatch({ matchId, wrestler, }) {
  return {
    type: types.ADD_WRESTLER_TO_MATCH,
    payload: { matchId, wrestler, },
  }
}

export function selectWinnerOfMatch({ matchId, wrestlerId, }) {
  return {
    type: types.SELECT_WINNER_IN_MATCH,
    payload: { matchId, wrestlerId, },
  }
}

export function resetMatches() {
  return {
    type: types.RESET_MATCHES,
  }
}
