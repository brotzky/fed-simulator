import * as types from "./types"

export function moveDrop(bucket, dropId) {
  return {
    type: types.MOVE_DROP,
    bucket,
    dropId,
  }
}
