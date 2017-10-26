import React from "react"
import PropTypes from "prop-types"

const NOOP = () => {}

const GenderIcon = ({ gender = false, onClick = NOOP, }) => (
  <a tabIndex="0" onKeyPress={onClick} onClick={onClick}>
    <i className={`icon fa fa-${gender ? "male" : "female"}`} />
  </a>
)

GenderIcon.propTypes = {
  gender: PropTypes.bool,
  onClick: PropTypes.func,
}

export default GenderIcon
