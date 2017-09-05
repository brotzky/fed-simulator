import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Draggable } from "react-drag-and-drop"

const Wrestler = ({ id, onClick, name, image, points, canDrag, }) => {
  const classes = classnames("wrestler", {
    "has-image": image,
  })
  return (
    <Draggable type="wrestler" enabled={canDrag} data={id}>
      <div className={classes} data-id={id} onClick={() => onClick(id)}>
        <span className="points">
          {points}
        </span>
        <span className="name">
          {name.trim().split(" ").map((newName, key) =>
            <div key={key}>
              {newName}
            </div>
          )}
        </span>
      </div>
    </Draggable>
  )
}

Wrestler.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  canDrag: PropTypes.bool,
  points: PropTypes.number.isRequired,
}

export default Wrestler
