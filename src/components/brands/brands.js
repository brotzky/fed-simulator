import React from "react"
import PropTypes from "prop-types"

import Brand from "../brand/brand"

import "./brands.scss"

const noop = () => {}

const Brands = ({ style = {}, highlighted, onClick = noop, brands = [], }) => (
  <div className="brands" tabIndex="0" style={style}>
    {brands.map(brand => <Brand onKeyPress={onClick} onClick={onClick} active={brand.id === highlighted} key={brand.id} {...brand} />)}
  </div>
)

Brands.propTypes = {
  brands: PropTypes.array,
  highlighted: PropTypes.any,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default Brands
