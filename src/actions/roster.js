import * as types from "./types"

export function updateWrestler(payload) {
  return {
    type: types.UPDATE_WRESTLER,
    payload,
  }
}

export function storeMatchData({ matches, championships }) {
  return {
    type: types.STORE_MATCH_DATA,
    payload: {
      matches,
      championships,
    },
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

export function resetRoster() {
  return {
    type: types.RESET_ROSTER,
  }
}
