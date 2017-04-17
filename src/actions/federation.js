import * as types from './types'

export function updateFederation(payload) {
  return {
    type: types.UPDATE_FEDERATION,
    payload,
  }
}
export function reset() {
  return {
    type: types.RESET,
  }
}
