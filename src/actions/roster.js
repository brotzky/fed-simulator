import * as types from "./types"

export function updateWrestler(payload) {
  return {
    type: types.UPDATE_WRESTLER,
    payload,
  }
}

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
