import React, { Component } from "react"
import moment from "moment"

import { getContrastRatioColor, getShadeBySize } from "../helpers/colours"

const noop = () => {}

export default class Liveshow extends Component {
  static defaultProps = {
    name: "",
    canBeDeleted: false,
    style: {},
    showDate: false,
    size: "sm",
    onClickDelete: noop,
    date: new Date(),
  }

  render() {
    let {
      name,
      canBeDeleted,
      style,
      showDate,
      size,
      onClickDelete,
      date,
    } = this.props
    style = this._getStyle(style, size)
    return (
      <div className="liveshow" style={style}>
        <If condition={canBeDeleted}>
          <i className="fa fa-trash" data-date={date} onClick={onClickDelete} />
          &nbsp;
        </If>
        <span className="name">{name}</span>
        <If condition={showDate}>
          &nbsp;
          ({moment(date).format("Do")})
        </If>
      </div>
    )
  }

  _getStyle(style, size) {
    let { color, backgroundColor, } = style

    backgroundColor = getShadeBySize(style.backgroundColor, size)
    color = getContrastRatioColor(backgroundColor)

    return Object.assign({}, style, {
      color,
      backgroundColor,
    })
  }
}
