import React, { Component } from "react"
import PropTypes from "prop-types"
import { DragSource } from "react-dnd"
import classnames from "classnames"

const boxSource = {
  beginDrag(props) {
    return {
      id: props.id,
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { id, name, image, points, connectDragSource, } = this.props
    const classes = classnames("wrestler", {
      "has-image": image,
    })

    return connectDragSource(
      <div className={classes} data-id={id}>
        <If condition={image}>
          <span className="image">
            <img src={image} />
          </span>
        </If>
        <span className="name">
          {name}
        </span>
        <sup>
          {points}
        </sup>
      </div>
    )
  }
}
