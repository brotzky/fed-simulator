import React, { Component } from "react"
import moment from "moment"

import acronymLongName from "../../helpers/acronym-long-name"
import { getContrastRatioColor, getShadeBySize } from "../../helpers/colours"

import "./liveshow.scss"

const noop = () => {}

export default class Liveshow extends Component {
  static defaultProps = {
    shortenName: false,
    shortenNameLength: 16,
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
      shortenNameLength,
      canBeDeleted,
      style,
      shortenName,
      showDate,
      size,
      onClickDelete,
      date,
    } = this.props
    style = this._getStyle(style, size)

    if (shortenName) {
      name = acronymLongName(name, shortenNameLength)
    }
    return (
      <span className="liveshow" style={style}>
        <If condition={canBeDeleted}>
          <i
            className="icon fa fa-trash cursor-nodrop"
            data-date={date}
            onClick={onClickDelete}
          />
          &nbsp;
        </If>
        <span className="liveshow__date" title={this.props.name}>{name}</span>
        <If condition={showDate}>
          &nbsp;
          <span className="liveshow__date">({moment(date).format("Do")})</span>
        </If>
      </span>
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
