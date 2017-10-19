import * as types from "./types"

export function updateWrestler(payload) {
  return {
    type: types.UPDATE_WRESTLER,
    payload,
  }
}

export function createWrestler(wrestler) {
  return {
    type: types.CREATE_WRESTLER,
    payload: wrestler,
  }
}

export function generateRoster() {
  return {
    type: types.GENERATE_ROSTER,
  }
}

export function deleteWrestler(id) {
  return {
    type: types.DELETE_WRESTLER,
    payload: id,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}
