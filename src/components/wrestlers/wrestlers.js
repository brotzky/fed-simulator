import React from "react"
import PropTypes from "prop-types"
import { Droppable } from "react-drag-and-drop"

import isHighlighted from "../../helpers/is-highlighted"
import Wrestler from "../wrestler/wrestler"

import "./wrestlers.scss"

const NOOP = () => {}

const Wrestlers = ({ collection = [], highlightNewest = false, onDrop = NOOP, onClick = NOOP, canDrag = true, style = {}, }) => {
  return (
    <Droppable types={["wrestler",]} onDrop={onDrop}>
      <div className="wrestlers" style={style}>
        {collection.map(wrestler => {
          const highlight = highlightNewest ? isHighlighted(wrestler.created) : false
          const props = { onClick, highlight, wrestler, canDrag, }

          return <Wrestler key={wrestler.id} {...props} />
        })}
      </div>
    </Droppable>
  )
}

Wrestlers.propTypes = {
  collection: PropTypes.array,
  highlightNewest: PropTypes.bool,
  onDrop: PropTypes.func,
  onClick: PropTypes.func,
  canDrag: PropTypes.bool,
  style: PropTypes.object,
}

export default Wrestlers
