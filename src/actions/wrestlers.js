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
}) {
  return {
    type: types.AWARD_MATCH_POINTS,
    winner,
    loser,
  }
}

export function moveAllWrestlersToDefault() {
  return {
    type: types.MOVE_All_WRESTLERS_TO_DEFAULT
  }
}
