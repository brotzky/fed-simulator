import * as types from "./types"

export function update(brand) {
  return {
    type: types.UPDATE_BRAND,
    brand,
  }
}
