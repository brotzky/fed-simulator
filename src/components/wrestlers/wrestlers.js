import React from "react"
import PropTypes from "prop-types"

import Wrestler from "../wrestler/wrestler"

import "./wrestlers.scss"

const NOOP = () => {}

const Wrestlers = ({ collection = [], onClick = NOOP, canDrag = true, style = {}, }) => {
  return (
    <div className="wrestlers" style={style}>
      {collection.map(wrestler => {
        const props = { onClick, wrestler, canDrag, }

        return <Wrestler key={wrestler.id} {...props} />
      })}
    </div>
  )
}

Wrestlers.propTypes = {
  collection: PropTypes.array,
  onClick: PropTypes.func,
  canDrag: PropTypes.bool,
  style: PropTypes.object,
}

export default Wrestlers
