import * as types from "./types"

export function toggleWrestlerToMatch(wrestler) {
  return {
    type: types.TOGGLE_WRESTLER_TO_MATCH,
    wrestler,
  }
}
