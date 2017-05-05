import * as types from './types'

export function reset() {
  return {
    type: types.RESET,
  }
}

export function updateCalendar(payload) {
  return {
    type: types.UPDATE_CALENDAR,
    payload,
  }
}

export function resetCalendar() {
  return {
    type: types.RESET_CALENDAR,
  }
}
