import * as types from "./types"

export function moveWrestler(
  brand,
  wrestlerId,
) {
  return {
    type: types.MOVE_WRESTLER,
    brand,
    wrestlerId,
  }
}

export function awardMatchPoints({
  winner,
  loser,
  losers,
}) {
  return {
    type: types.AWARD_MATCH_POINTS,
    winner,
    loser,
    losers,
  }
}

export function moveAllWrestlersToDefault() {
  return {
    type: types.MOVE_All_WRESTLERS_TO_DEFAULT
  }
}

export function reset() {
  return {
    type: types.RESET
  }
}
