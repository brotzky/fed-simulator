import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Draggable } from "react-drag-and-drop"

const Wrestler = ({ id, onClick, name, image, points, championshipId, canDrag, }) => {
  const classes = classnames(
    "wrestler",
    {
      "has-image": image,
    },
    {
      "has-championship": championshipId,
    }
  )
  let names = name.trim().split(" ")

  const hasOneName = names.length === 1

  if (names.length > 2) {
    names = [names[0], `${names[1]} ${names[2]}`,]
  }

  return (
    <Draggable type="wrestler" enabled={canDrag} data={id}>
      <div className={classes} data-id={id} onKeyPress={() => onClick(id)} onClick={() => onClick(id)}>
        <span tabIndex="0" className="points">
          {points}
        </span>
        <span tabIndex="0" className="name">
          {names.map((newName, key) => <div key={key}>{newName}</div>)}
          <If condition={hasOneName}>
            <div>&nbsp;</div>
          </If>
        </span>
      </div>
    </Draggable>
  )
}

Wrestler.propTypes = {
  canDrag: PropTypes.bool,
  championshipId: PropTypes.any,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  points: PropTypes.number.isRequired,
}

export default Wrestler
