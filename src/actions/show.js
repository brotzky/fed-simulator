import * as types from "./types"

export function createShow(show) {
  return {
    type: types.CREATE_SHOW,
    show,
  }
}

export function deleteShow(showId) {
  return {
    type: types.DELETE_SHOW,
    showId,
  }
}

export function updateShow(show) {
  return {
    type: types.UPDATE_SHOW,
    show,
  }
}

export function simulateShow(showId, moves) {
  return {
    type: types.SIMULATE_SHOW,
    showId,
    moves,
  }
}

export function removeWrestlerFromMatch(showId, matchIndex, wrestler) {
  return {
    type: types.REMOVE_WRESTLER_FROM_MATCH,
    showId,
    matchIndex,
    wrestler,
  }
}

export function addWrestlerToMatch(showId, matchIndex, wrestler) {
  return {
    type: types.ADD_WRESTLER_TO_MATCH,
    showId,
    matchIndex,
    wrestler,
  }
}

export function selectPPVForShow(showId, PPV) {
  return {
    type: types.SELECT_PPV_FOR_SHOW,
    showId,
    PPV,
  }
}

export function selectBrandForShow(showId, brand) {
  return {
    type: types.SELECT_BRAND_FOR_SHOW,
    showId,
    brand,
  }
}

export function resetShows() {
  return {
    type: types.RESET_SHOWS,
  }
}

export function resetShow(showId) {
  return {
    type: types.RESET_SHOW,
    showId,
  }
}

export function randomiseShow(showId, wrestlers) {
  return {
    type: types.RANDOMISE_SHOW,
    showId,
    wrestlers,
  }
}
