import * as types from "./types"

export function updateShows(payload) {
  return {
    type: types.UPDATE_SHOWS,
    payload,
  }
}

export function generateShows() {
  return {
    type: types.GENERATE_SHOWS,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}
