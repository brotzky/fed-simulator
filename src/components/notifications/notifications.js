import { connect } from "react-redux"
import React, { Component } from "react"
import { SlideDown } from "animate-components"

import * as notificationsActions from "../../actions/notifications"

import { ANIMATION_SPEED } from "../../constants/animation"

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
    const { notifications, style, } = this.props

    return (
      <div className="notifications" style={style}>
        <If condition={notifications.length > 0}>
          <p>
            <a onClick={this.resetNotifications}>Clear All</a>
          </p>
          <SlideDown duration={ANIMATION_SPEED}>
            <ul className="notifications__list">
              {notifications.map(notification => {
                const { id, title, } = notification

                return (
                  <li className="notification" key={id}>
                    <a data-id={id} onClick={this.onRemoveNotification}>
                      {title} <i className="icon fa fa-trash" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </SlideDown>
        </If>
      </div>
    )
  }
}

export default connect(state => ({
  notifications: state.notifications,
  style: state.style,
}))(Notifications)
