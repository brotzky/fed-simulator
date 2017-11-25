import React from "react"
import PropTypes from "prop-types"

import "./header.scss"

const Header = ({ style = {}, className = "", children = undefined, }) => (
  <h2 style={style} className={className}>
    {children}
  </h2>
)

Header.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export default Header
