import React, { Component } from "react"
import PropTypes from "prop-types"
import { DragSource } from "react-dnd"

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    }
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
    size: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { name, size, style, isDragging, connectDragSource, } = this.props
    const opacity = isDragging ? 0.4 : 1

    return connectDragSource(
      <div className="boxes" style={Object.assign(style, opacity)}>
        {name} (<span className="boxes__size">{size}</span>)
      </div>
    )
  }
}
