import * as types from "./types"

export function awardChampionship(championship, wrestlerId) {
  return {
    type: types.MOVE_CHAMPIONSHIP,
    championship,
    wrestlerId,
  }
}


export function clearChampionships() {
  return {
    type: types.CLEAR_SELECTED_CHAMPIONS,
  }
}
