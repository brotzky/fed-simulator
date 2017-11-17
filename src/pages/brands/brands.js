import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Create from "../../components/create/brand.container.js"
import Collection from "../../components/collection/brands.container"
import { Generate, Reset } from "../../components/icons"

import "./brands.scss"

const NOOP = () => {}

const BrandsPage = ({ onClear = NOOP, onGenerate = NOOP, }) => {
  return (
    <section className="page manage-brands">
      <HeaderOne>
        Manage Brands
        <span className="tools">
          <Generate onClick={onGenerate} title="Generate brands" tabIndex="0" />
          <Reset onClick={onClear} />
        </span>
      </HeaderOne>
      <Collection />
      <Create />
    </section>
  )
}

BrandsPage.propTypes = {
  onClear: PropTypes.func,
  onGenerate: PropTypes.func,
}

export default BrandsPage
