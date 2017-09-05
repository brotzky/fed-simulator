import React from "react"
import PropTypes from "prop-types"
import { Droppable } from "react-drag-and-drop"

import Wrestler from "./wrestler"

import "./wrestlers.scss"

const NOOP = () => {}

const Wrestlers = ({
  male = true,
  onWrestlerClick = NOOP,
  onDrop = NOOP,
  order = true,
  roster = [],
  showFilter = true,
  orderBy = true,
  style = {},
  toggleGender = NOOP,
  toggleOrder = NOOP,
  toggleOrderBy = NOOP,
}) => {
  const gender = male ? "male" : "female"
  const direction = order ? "desc" : "asc"
  const sortBy = orderBy ? "alpha" : "numeric"
  return (
    <Droppable types={["wrestler",]} onDrop={onDrop}>
      <div className="wrestlers-wrapper" style={style}>
        <If condition={showFilter}>
          <div className="filters">
            <a onClick={toggleGender}>
              <i className={`icon fa fa-${gender}`} />
            </a>
            <a onClick={toggleOrderBy}>
              <i className={`icon fa fa-sort-${sortBy}-${direction}`} />
            </a>
            <a onClick={toggleOrder}>
              <i className={`icon fa fa-sort-${direction}`} />
            </a>
          </div>
        </If>
        <div className="wrestlers">
          {roster.map(wrestler => {
            return <Wrestler key={wrestler.id} onClick={onWrestlerClick} className="wrestler" {...wrestler} />
          })}
        </div>
      </div>
    </Droppable>
  )
}

Wrestlers.propTypes = {
  gender: PropTypes.string,
  male: PropTypes.bool,
  onWrestlerClick: PropTypes.func,
  onDrop: PropTypes.func,
  order: PropTypes.bool,
  orderBy: PropTypes.bool,
  roster: PropTypes.array,
  showFilter: PropTypes.bool,
  style: PropTypes.object,
  toggleGender: PropTypes.func,
  toggleOrder: PropTypes.func,
  toggleOrderBy: PropTypes.func,
}

export default Wrestlers
