import * as types from './types'

export function reset() {
  return {
    type: types.RESET,
  }
}

export function generateEventsForMonth(payload) {
  return {
    type: types.CREATE_EVENTS,
    payload,
  }
}
