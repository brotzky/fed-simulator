import React from "react"
import PropTypes from "prop-types"

import ColorPickers from "../../components/color-pickers/color-pickers"
import HeaderOne from "../../components/h1/h1"
import Input from "../../components/form/input"

import "./manage-brands.scss"

const NOOP = () => {}

const ManageBrandsPage = ({
  onChangeBackgroundColor = NOOP,
  onChangeColor = NOOP,
  onChangeName = NOOP,
  brands = [],
}) => {
  return (
    <section className="page manage-brands">
      <HeaderOne>Manage Brands</HeaderOne>
      {brands.map(brand => {
        return (
          <div className="row middle-xs" key={brand.id} style={brand.style}>
            <div className="col-xs-10">
              <Input
                style={brand.style}
                value={brand.name}
                onChange={event => onChangeName(brand, event)}
              />
            </div>
            <div className="col-xs-2">
              <ColorPickers
                onChangeColor={onChangeColor}
                onChangeBackgroundColor={onChangeBackgroundColor}
                {...brand.style}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}

ManageBrandsPage.propTypes = {
  brands: PropTypes.array,
  onChangeName: PropTypes.func,
  onChangeBackgroundColor: PropTypes.func,
  onChangeColor: PropTypes.func,
}

export default ManageBrandsPage
