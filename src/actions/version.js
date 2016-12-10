import * as types from "./types"

export function checkVersion() {
  return {
    type: types.CHECK_VERSION,
  }
}
