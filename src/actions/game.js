import * as types from "./types"

export function togglePlan() {
  return {
    type: types.TOGGLE_PLAN,
  }
}

export function toggleAnimations() {
  return {
    type: types.TOGGLE_ANIMATIONS,
  }
}

export function updateGame(payload) {
  return {
    type: types.UPDATE_GAME,
    payload,
  }
}
export function addOneMonth() {
  return {
    type: types.ADD_ONE_MONTH,
  }
}
export function resetGame() {
  return {
    type: types.RESET_GAME,
  }
}

export function addProfitToTotal(profit) {
  return {
    type: types.ADD_PROFIT,
    payload: profit,
  }
}
