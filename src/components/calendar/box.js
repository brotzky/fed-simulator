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
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    canDrag: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { connectDragSource, classes, } = this.props

    return connectDragSource(
      <div className={`${classes} boxes`}>
        {this.props.children}
      </div>
    )
  }
}
