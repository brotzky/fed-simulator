import * as types from "./types"

export function generateFederation() {
  return {
    type: types.GENERATE,
  }
}

export function toggleSimulation() {
  return {
    type: types.TOGGLE_SIMULATION,
  }
}

export function toggleStarted() {
  return {
    type: types.TOGGLE_STARTED,
  }
}

export function toggleAnimations() {
  return {
    type: types.TOGGLE_ANIMATIONS,
  }
}

export function updateName(name) {
  return {
    type: types.UPDATE_NAME,
    payload: { name, },
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
