import React from "react"
import PropTypes from "prop-types"

import "./winner.scss"

export const Winner = ({ name = "", }) => (
  <h2 className="winner pulse">
    <span>
      <i tabIndex="0" className="icon green fa fa-angle-double-up" />
      &nbsp;{name} Wins
    </span>
  </h2>
)

export const Loser = ({ name = "", }) => (
  <h5 className="loser pulse">
    <span>
      <i tabIndex="0" className="icon red fa fa-angle-double-down" />
      &nbsp;{name} Loses 😵
    </span>
  </h5>
)

Loser.propTypes = {
  name: PropTypes.string.isRequired,
}

Winner.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Winner
