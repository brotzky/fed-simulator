import React from "react"
import classNames from "classnames/bind"
import PropTypes from "prop-types"

import "./brand.scss"

const noop = () => {}

const Brand = ({ style = {}, id = "", active = false, onClick = noop, name = "", }) => (
  <span tabIndex="0" onKeyPress={() => onClick(id)} onClick={() => onClick(id)} className={classNames({ active: active, }, "brand")} style={style}>
    {name}
  </span>
)

Brand.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.any,
  name: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default Brand
