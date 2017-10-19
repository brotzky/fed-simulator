import { compose } from "recompose"
import { connect } from "react-redux"

import Notifications from "./notifications"

import { resetNotifications, deleteNotification } from "../../actions/notifications"

export default compose(
  connect(
    state => ({
      notifications: state.notifications,
      style: state.style,
    }),
    dispatch => ({
      onReset: () => dispatch(resetNotifications()),
      onDelete: id => dispatch(deleteNotification(id)),
    })
  )
)(Notifications)
