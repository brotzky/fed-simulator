import React from "react"
import PropTypes from "prop-types"
import { Droppable } from "react-drag-and-drop"

import Wrestler from "./wrestler"

import "./wrestlers.scss"
import "./wrestlers.skin.scss"
import "./wrestlers.structure.scss"

const NOOP = () => {}

const Wrestlers = ({
  male = true,
  onClick = NOOP,
  onDrop = NOOP,
  order = true,
  roster = [],
  showFilter = true,
  showToggleBrand = false,
  noBrand = true,
  orderBy = true,
  style = {},
  toggleBrandless = NOOP,
  toggleGender = NOOP,
  toggleOrder = NOOP,
  toggleOrderBy = NOOP,
}) => {
  const gender = male ? "male" : "female"
  const direction = order ? "desc" : "asc"
  const sortBy = orderBy ? "alpha" : "numeric"
  const brandless = noBrand ? "eye-slash" : "eye"
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
            <If condition={showToggleBrand}>
              <a onClick={toggleBrandless}>
                <i className={`icon fa fa-${brandless}`} />
              </a>
            </If>
          </div>
        </If>
        <div className="wrestlers">
          {roster.map(wrestler => {
            return <Wrestler key={wrestler.id} onClick={onClick} className="wrestler" {...wrestler} />
          })}
        </div>
      </div>
    </Droppable>
  )
}

Wrestlers.propTypes = {
  gender: PropTypes.string,
  male: PropTypes.bool,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  order: PropTypes.bool,
  orderBy: PropTypes.bool,
  roster: PropTypes.array,
  noBrand: PropTypes.bool,
  showFilter: PropTypes.bool,
  showToggleBrand: PropTypes.bool,
  style: PropTypes.object,
  toggleBrandless: PropTypes.func,
  toggleGender: PropTypes.func,
  toggleOrder: PropTypes.func,
  toggleOrderBy: PropTypes.func,
}

export default Wrestlers
