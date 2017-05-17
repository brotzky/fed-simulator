import * as types from "./types"

export function resetCalendar() {
  return {
    type: types.RESET_CALENDAR,
  }
}

export function startNextCalendarMonth() {
  return {
    type: types.START_CALENDAR_MONTH,
  }
}

export function generateLiveShowsForMonth({ month, year, }) {
  return {
    type: types.GENERATE_CALENDAR_LIVESHOWS,
    payload: { month, year, },
  }
}

export function updateCalendarLiveShows(liveShows) {
  return {
    type: types.UPDATE_CALENDAR_LIVESHOWS,
    payload: liveShows,
  }
}

export function updateCalendarLiveShow(payload) {
  return {
    type: types.UPDATE_CALENDAR_LIVESHOW,
    payload,
  }
}

export function deleteLiveShows() {
  return {
    type: types.DELETE_CALENDAR_LIVESHOWS,
  }
}

export function deleteLiveShow(payload) {
  return {
    type: types.DELETE_CALENDAR_LIVESHOW,
    payload,
  }
}

export function simulateLiveShows() {
  return {
    type: types.SIMULATE_CALENDAR_LIVESHOWS,
  }
}
