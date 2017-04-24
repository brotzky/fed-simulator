import * as types from './types'

export function updateShows(payload) {
  return {
    type: types.UPDATE_SHOWS,
    payload,
  }
}
export function reset() {
  return {
    type: types.RESET,
  }
}
