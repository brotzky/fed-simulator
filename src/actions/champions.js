import * as types from "./types"

export function updateChampions(payload) {
  return {
    type: types.UPDATE_CHAMPIONS,
    payload,
  }
}

export function generateChampionships() {
  return {
    type: types.GENERATE_CHAMPIONSHIPS,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}
