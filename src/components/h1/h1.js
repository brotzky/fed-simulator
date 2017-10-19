import React from "react"
import PropTypes from "prop-types"

import "./h1.scss"

const HeaderOne = ({ style = {}, className = "", children = undefined, }) => (
  <h1 style={style} className={className}>
    {children}
  </h1>
)

HeaderOne.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export default HeaderOne
