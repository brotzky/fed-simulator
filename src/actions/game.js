import * as types from "./types"

export function generateFederation() {
  return {
    type: types.GENERATE,
  }
}

export function toggleStarted() {
  return {
    type: types.TOGGLE_STARTED,
  }
}

export function updateName(name) {
  return {
    type: types.UPDATE_NAME,
    payload: { name, },
  }
}

export function resetAll() {
  return {
    type: types.RESET,
  }
}
