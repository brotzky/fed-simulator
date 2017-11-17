import * as types from "./types"

export function update(item) {
  return {
    type: types.UPDATE_SHOW,
    payload: item,
  }
}

export function createShow(item) {
  return {
    type: types.CREATE_SHOW,
    payload: item,
  }
}

export function deleteShow(id) {
  return {
    type: types.DELETE_SHOW,
    payload: id,
  }
}
