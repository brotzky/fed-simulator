import React from "react"
import { connect } from "react-redux"

import "./generate-random.scss"

const GenerateRandom = ({ onClick, color, }) => {
  return (
    <a style={{ color, }} className="cursor-pointer medium-title" onClick={onClick}>
      Auto Generate <i className="icon fa fa-angle-right" aria-hidden="true" />
    </a>
  )
}

export default connect(state => ({
  color: state.style.color,
}))(GenerateRandom)
