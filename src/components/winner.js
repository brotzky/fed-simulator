import React from "react"
import PropTypes from "prop-types"

export const Winner = ({ name = "", animation = "float-shadow", }) => (
  <h2 className={`winner ${animation}`}>
    <span>
      <i className="icon green fa fa-angle-double-up" aria-hidden="true" />
      &nbsp;{name} Wins
    </span>
  </h2>
)

export const Loser = ({ name = "", animation = "sink", }) => (
  <h5 className={`loser ${animation}`}>
    <span>
      <i className="icon red fa fa-angle-double-down" aria-hidden="true" />
      &nbsp;{name} Loses 😵
    </span>
  </h5>
)

Loser.propTypes = {
  name: PropTypes.string.isRequired,
  animation: PropTypes.string,
}

Winner.propTypes = {
  name: PropTypes.string.isRequired,
  animation: PropTypes.string,
}

export default Winner
