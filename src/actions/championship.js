import * as types from "./types"

export function awardChampionship(championship, wrestlerId) {
  return {
    type: types.MOVE_CHAMPIONSHIP,
    championship,
    wrestlerId,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}

export function clear() {
  return {
    type: types.CLEAR,
  }
}

export function checkMove({
  winner,
  loser,
  losers,
}) {
  return {
    type: types.CHECK_CHAMPIONSHIP,
    winner,
    loser,
    losers,
  }
}
