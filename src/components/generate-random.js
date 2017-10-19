import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import "./generate-random.scss"

const GenerateRandom = ({ onClick, color, }) => {
  return (
    <a style={{ color, }} className="cursor-pointer medium-title" onClick={onClick}>
      Auto Generate <i className="icon fa fa-angle-right" aria-hidden="true" />
    </a>
  )
}

GenerateRandom.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}

export default connect(state => ({
  color: state.style.color,
}))(GenerateRandom)
