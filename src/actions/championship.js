import * as types from "./types"

export function awardChampionship(championship, wrestlerId) {
  return {
    type: types.MOVE_CHAMPIONSHIP,
    championship,
    wrestlerId,
  }
}
