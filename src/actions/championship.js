import * as types from "./types"

export function awardChampionship(championship, wrestler) {
  return {
    type: types.MOVE_CHAMPIONSHIP,
    championship,
    wrestler,
  }
}

export function reset() {
  return {
    type: types.RESET_CHAMPIONS,
  }
}

export function clear() {
  return {
    type: types.CLEAR_CHAMPIONS,
  }
}

export function shouldTheChampionshipMove({
  winner,
  loser,
  losers,
}) {
  return {
    type: types.SHOULD_MOVE_CHAMPIONSHIP,
    winner,
    loser,
    losers,
  }
}
