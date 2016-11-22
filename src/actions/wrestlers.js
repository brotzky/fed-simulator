import * as types from "./types"

export function moveWrestler(brand, wrestlerId) {
  return {
    type: types.MOVE_WRESTLER,
    brand,
    wrestlerId,
  }
}

export function moveAllWrestlersToDefault() {
  return {
    type: types.MOVE_All_WRESTLERS_TO_DEFAULT
  }
}
