import * as types from "./types"

export function resetNotifications() {
  return {
    type: types.RESET_NOTIFICATIONS,
  }
}

export function removeNotification(notificationId) {
  return {
    type: types.REMOVE_NOTIFICATION,
    payload: { notificationId, },
  }
}
