import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Draggable } from "react-drag-and-drop"

import { schema } from "../../models/wrestler.model"
import processNames from "./process-names"

import "./wrestler.scss"

const NOOP = () => {}

const Wrestler = ({ wrestler = schema, onClick = NOOP, highlight = false, canDrag = true, }) => {
  const { id, name, brandId, points, image, } = wrestler
  const classes = classnames("wrestler", { [brandId]: brandId, }, { "has-highlight": highlight, }, { "has-image": image, })
  const names = processNames(name)
  const withImage = image ? { backgroundImage: `url(${image}`, } : {}

  return (
    <Draggable type="wrestler" enabled={canDrag} data={id}>
      <div className={classes} style={withImage} data-id={id} tabIndex="0" onKeyPress={() => onClick(id)} onClick={() => onClick(id)}>
        <span className="points">{points}</span>
        <span className="name">{names.map((newName, key) => <div key={key}>{newName}</div>)}</span>
      </div>
    </Draggable>
  )
}

Wrestler.propTypes = {
  onClick: PropTypes.func,
  canDrag: PropTypes.bool,
  highlight: PropTypes.bool,
  wrestler: PropTypes.shape({
    id: PropTypes.string.isRequired,
    brandId: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
  }),
}

export default Wrestler
