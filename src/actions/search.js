import * as types from "./types"

export function searchMade(query) {
  return {
    type: types.SEARCH,
    query,
  }
}
