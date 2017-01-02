import * as types from "./types"

export function reset() {
  return {
    type: types.RESET,
  }
}

export function toggleStoryByDefault() {
  return {
    type: types.SHOW_STORY_BY_DEFAULT,
  }
}
