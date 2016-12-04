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
