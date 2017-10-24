import * as types from "./types"

export function update(item) {
  return {
    type: types.UPDATE_SHOW,
    payload: item,
  }
}

export function create(item) {
  return {
    type: types.CREATE_SHOW,
    payload: item,
  }
}

export function delete(id) {
  return {
    type: types.DELETE_SHOW,
    payload: id,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}
