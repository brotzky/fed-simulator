import * as types from './types'

export function reset() {
  return {
    type: types.RESET,
  }
}

export function resetEvents() {
  return {
    type: types.RESET_EVENTS,
  }
}

export function generateEventsForMonth(shows) {
  return {
    type: types.CREATE_EVENTS,
    payload: shows,
  }
}

export function updateEvents(events) {
  return {
    type: types.UPDATE_EVENTS,
    payload: events,
  }
}

export function updateEvent(payload) {
  return {
    type: types.UPDATE_EVENT,
    payload,
  }
}
