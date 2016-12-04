import * as types from "./types"

export function toggleWrestlerToMatch(wrestler) {
  return {
    type: types.TOGGLE_WRESTLER_TO_MATCH,
    wrestler,
  }
}

export function clearSelectedWrestlers() {
  return {
    type: types.CLEAR_SELECTED_WRESTLERS,
  }
}

export function clearStory() {
  return {
    type: types.CLEAR_STORY,
  }
}

export function simulate(story) {
  return {
    type: types.SIMULATE_MATCH,
    story,
  }
}
