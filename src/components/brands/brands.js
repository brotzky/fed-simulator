import React from "react"
import PropTypes from "prop-types"

import Brand from "../brand/brand"

import "./brands.scss"

const noop = () => {}

const Brands = ({ style = {}, highlighted, onBrandClick = noop, brands = [], }) =>
  <div className="brands" style={style}>
    {brands.map(brand => <Brand onClick={onBrandClick} active={brand.id === highlighted} key={brand.id} {...brand} />)}
  </div>

Brands.propTypes = {
  style: PropTypes.object,
  highlighted: PropTypes.string,
  onBrandClick: PropTypes.func,
  brands: PropTypes.array,
}

export default Brands
