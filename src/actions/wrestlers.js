import * as types from "./types"

export function moveWrestler(bucket, wrestlerId) {
  return {
    type: types.MOVE_WRESTLER,
    bucket,
    wrestlerId,
  }
}

export function moveAllWrestlersToDefault() {
  return {
    type: types.MOVE_All_WRESTLERS_TO_DEFAULT
  }
}
