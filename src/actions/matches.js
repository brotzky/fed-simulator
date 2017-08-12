import * as types from "./types"

export function createMatch(payload) {
  return {
    type: types.CREATE_MATCH,
    payload,
  }
}

export function generateRandomMatches({ amountOfMatches = 100, roster = [], }) {
  return {
    type: types.GENERATE_RANDOM_MATCHES,
    payload: { amountOfMatches, roster, },
  }
}

export function simulateMatch(matchId) {
  return {
    type: types.SIMULATE_MATCH,
    payload: { matchId, },
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
