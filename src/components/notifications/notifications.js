import React from "react"
import PropTypes from "prop-types"

import "./notifications.scss"

const NOOP = () => {}

const Notifications = ({ notifications, onDelete, onReset, style, limit, }) =>
  <div className="notifications">
    <If condition={notifications.length > 0}>
      <h3>
        <a onClick={onReset}>Clear All</a>
      </h3>
      <div className="notifications__list">
        {notifications.slice(0, limit).map(notification => {
          const { id, title, } = notification
          return (
            <div className="notification" style={style} key={id}>
              <a data-id={id} onClick={() => onDelete(id)}>
                {title} <i className="icon fa fa-trash" />
              </a>
            </div>
          )
        })}
      </div>
    </If>
  </div>

Notifications.propTypes = {
  limit: PropTypes.number,
  notifications: PropTypes.array,
  onDelete: PropTypes.func,
  onReset: PropTypes.func,
  style: PropTypes.object,
}

Notifications.defaultProps = {
  limit: 3,
  notifications: [],
  onDelete: NOOP,
  onReset: NOOP,
  style: {},
}

export default Notifications
