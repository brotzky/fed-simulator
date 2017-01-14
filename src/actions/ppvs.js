import * as types from "./types"

export function create(ppv) {
  return {
    type: types.CREATE_PPV,
    ppv,
  }
}

export function update(ppv) {
  return {
    type: types.UPDATE_PPV,
    ppv,
  }
}
