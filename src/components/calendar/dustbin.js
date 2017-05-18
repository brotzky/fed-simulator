import React, { Component } from "react"
import classNames from "classNames"
import PropTypes from "prop-types"
import { DropTarget } from "react-dnd"

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  },
}

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
  static propTypes = {
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    canDrop: PropTypes.bool.isRequired,
    classes: PropTypes.string,
    connectDropTarget: PropTypes.func.isRequired,
    droppedItem: PropTypes.object,
    isOver: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const {
      canDrop,
      classes,
      connectDropTarget,
      droppedItem,
      isOver,
      name,
      previous,
    } = this.props
    const isActive = isOver && canDrop
    const outerClasses = classNames(
      classes,
      "dustbin",
      { active: isActive, },
      { available: canDrop, },
      { previous: previous, }
    )
    return connectDropTarget(
      <div className={outerClasses}>
        <p className="dustbin__name">
          {name}
        </p>
        <p className="dustbin__details">
          {!droppedItem &&
            <span className="drop">
              {isActive ? "Release to drop" : ""}
            </span>}
          &nbsp;
          <If condition={droppedItem.name}>
            <span className="show__name" style={this.props.style}>
              {droppedItem.name} ({droppedItem.size})
            </span>
          </If>
        </p>
      </div>
    )
  }
}
