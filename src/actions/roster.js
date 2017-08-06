import * as types from "./types"

export function updateWrestler(payload) {
  return {
    type: types.UPDATE_WRESTLER,
    payload,
  }
}

export function generateRoster() {
  return {
    type: types.GENERATE_ROSTER,
  }
}

export function removeWrestler(id) {
  return {
    type: types.REMOVE_WRESTLER,
    payload: { id, },
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
