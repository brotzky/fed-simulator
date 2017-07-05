import * as types from "./types"

export function updateRoster(payload) {
  return {
    type: types.UPDATE_ROSTER,
    payload,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}

export function saveMatchPointsToWrestlers({ matches, }) {
  return {
    type: types.SAVE_MATCH_POINTS_TO_WRESTLERS,
    payload: matches,
  }
}
