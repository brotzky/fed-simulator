import * as types from "./types"

export function updateStyle(payload) {
  return {
    type: types.UPDATE_STYLE,
    payload,
  }
}
