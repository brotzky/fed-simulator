import React, { Component } from "react"
import PropTypes from "prop-types"
import { DragSource } from "react-dnd"

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    }
  },
  canDrag(props) {
    return props.canDrag
  },
}

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
  static propTypes = {
    canDrag: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    classes: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    type: PropTypes.string.isRequired,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { connectDragSource, classes, children, } = this.props

    return connectDragSource(
      <div className={`${classes} boxes`}>
        {children}
      </div>
    )
  }
}
