import * as types from "./types"

export function reset() {
  return {
    type: types.RESET,
  }
}

export function createChampionship(championship) {
  return {
    type: types.CREATE_CHAMPIONSHIP,
    payload: championship,
  }
}

export function awardChampionship({ id, wrestlerId, }) {
  return {
    type: types.AWARD_CHAMPIONSHIP,
    payload: { id, wrestlerId, },
  }
}

export function generateChampionships() {
  return {
    type: types.GENERATE_CHAMPIONSHIPS,
  }
}

export function updateChampionship(championship) {
  return {
    type: types.UPDATE_CHAMPIONSHIP,
    payload: championship,
  }
}

export function deleteChampionship(id) {
  return {
    type: types.DELETE_CHAMPIONSHIP,
    payload: id,
  }
}

export function resetChampionships() {
  return {
    type: types.RESET_CHAMPIONSHIPS,
  }
}
