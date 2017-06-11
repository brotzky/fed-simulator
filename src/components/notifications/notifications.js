import { connect } from "react-redux"
import React, { Component } from "react"
import { SlideDown } from "animate-components"

import * as notificationsActions from "../../actions/notifications"

import "./notifications.scss"

class Notifications extends Component {
  resetNotifications = event => {
    event.preventDefault()

    this.props.dispatch(notificationsActions.resetNotifications())
  }

  onRemoveNotification = event => {
    const notificationId = event.currentTarget.dataset.id

    this.props.dispatch(notificationsActions.removeNotification(notificationId))
  }

  render() {
    const { notifications, } = this.props

    return (
      <ul className="notifications">
        <If condition={notifications.length > 0}>
          <SlideDown duration="1s">
            <a onClick={this.resetNotifications}>Clear All</a>
            {notifications.map(notification => {
              const { id, title, } = notification

              return (
                <li className="notification" key={id}>
                  {title}
                  <a data-id={id} onClick={this.onRemoveNotification}>
                    (close)
                  </a>
                </li>
              )
            })}
          </SlideDown>
        </If>
      </ul>
    )
  }
}

export default connect(state => ({
  notifications: state.notifications,
}))(Notifications)
