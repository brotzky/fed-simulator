import * as types from "./types"

export function resetNotifications() {
  return {
    type: types.RESET_NOTIFICATIONS,
  }
}

export function deleteNotification(id) {
  return {
    type: types.DELETE_NOTIFICATION,
    payload: { id, },
  }
}
