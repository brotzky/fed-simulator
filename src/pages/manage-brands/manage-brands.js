import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Brand from "../../components/brand/brand"
import Input from "../../components/form/input"

import "./manage-brands.scss"

const ManageBrandsPage = ({ brands = [], }) => {
  return (
    <section className="page manage-brands">
      <HeaderOne>Manage Brands</HeaderOne>
      <div className="row">
        <div className="col-xs-12">
          {brands.map(brand => {
            return (
              <div key={brand.id} style={brand.style}>
                <Input style={brand.style} value={brand.name} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

ManageBrandsPage.propTypes = {
  brands: PropTypes.array.isRequired,
}

export default ManageBrandsPage
