import * as types from "./types"

export function reset() {
  return {
    type: types.RESET,
  }
}

export function createBrand(brand) {
  return {
    type: types.CREATE_BRAND,
    payload: brand,
  }
}

export function updateBrand(brand) {
  return {
    type: types.UPDATE_BRAND,
    payload: brand,
  }
}

export function deleteBrand(id) {
  return {
    type: types.DELETE_BRAND,
    payload: id,
  }
}

export function resetBrands() {
  return {
    type: types.RESET_BRANDS,
  }
}
