import React from "react"
import PropTypes from "prop-types"

import ColorPickers from "../../components/color-pickers/color-pickers"
import HeaderOne from "../../components/h1/h1"
import Input from "../../components/form/input"
import AddBrand from "../../components/add-brand/container.js"

import "./manage-brands.scss"

const NOOP = () => {}

const ManageBrandsPage = ({
  onChangeBackgroundColor = NOOP,
  onChangeColor = NOOP,
  onChangeName = NOOP,
  onClear = NOOP,
  onDelete = NOOP,
  brands = [],
}) => {
  return (
    <section className="page manage-brands">
      <HeaderOne>
        Manage Brands{" "}
        <a onClick={onClear}>
          <i className="icon fa fa-trash fa-lg" />
        </a>
      </HeaderOne>
      {brands.map(brand => {
        const style = brand.style
        return (
          <div className="row middle-xs" key={brand.id} style={style}>
            <div className="col-xs-1 center-xs">
              <a onClick={() => onDelete(brand.id)}>
                <div className="icon fa fa-trash-o fa-md" />
              </a>{" "}
            </div>
            <div className="col-xs-10 text-left">
              <Input
                style={style}
                value={brand.name}
                onChange={event => onChangeName(brand, event)}
              />
            </div>
            <div className="col-xs-1">
              <ColorPickers
                onChangeColor={event => onChangeColor(brand, event)}
                onChangeBackgroundColor={event =>
                  onChangeBackgroundColor(brand, event)}
                {...brand.style}
              />
            </div>
          </div>
        )
      })}
      <AddBrand />
    </section>
  )
}

ManageBrandsPage.propTypes = {
  brands: PropTypes.array,
  onChangeName: PropTypes.func,
  onChangeBackgroundColor: PropTypes.func,
  onChangeColor: PropTypes.func,
  onClear: PropTypes.func,
  onDelete: PropTypes.func,
}

export default ManageBrandsPage
