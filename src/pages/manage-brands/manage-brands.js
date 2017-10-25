import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import AddBrand from "../../components/add-brand/container.js"
import Collection from "../../components/collection/brands.container"

import "./manage-brands.scss"

const NOOP = () => {}

const ManageBrandsPage = ({ onClear = NOOP }) => {
  return (
    <section className="page manage-brands">
      <HeaderOne>
        Manage Brands{" "}
        <a onClick={onClear}>
          <i className="icon fa fa-trash fa-sm" />
        </a>{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Type inline to update a brand
        </span>
      </HeaderOne>
			<Collection />
      <AddBrand />
    </section>
  )
}

ManageBrandsPage.propTypes = {
  onClear: PropTypes.func,
}

export default ManageBrandsPage
