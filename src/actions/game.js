import * as types from "./types"

export function generateFederation() {
  return {
    type: types.GENERATE_FEDERATION,
  }
}

export function togglePlan() {
  return {
    type: types.TOGGLE_PLAN,
  }
}

export function startGame() {
  return {
    type: types.START_GAME,
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

export function reset() {
  return {
    type: types.RESET,
  }
}

export function resetGame() {
  return {
    type: types.RESET_GAME,
  }
}
