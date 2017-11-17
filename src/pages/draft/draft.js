import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Wrestlers from "../../components/wrestlers/container"
import Brand from "../../components/brand/brand"
import Create from "../../components/create/brand.container"

import { ADD_BRAND_ENTRY } from "../../constants/confirmations"

import "./draft.scss"

const defaultBrand = {
  id: 0,
  name: "All",
  style: { color: "white", backgroundColor: "gray" },
}

const DraftPage = ({ brands = [], style = {} }) => {
  return (
    <section className="page draft">
      <HeaderOne>Draft</HeaderOne>
      <If condition={brands.length === 0}>
        <Create placeholder={ADD_BRAND_ENTRY} />
      </If>
      <If condition={brands.length > 0}>
        <div className="brands">
          <div style={defaultBrand.style} className="brand">
            <Brand {...defaultBrand} />
            <Wrestlers showToggleBrand={true} style={defaultBrand.style} />
          </div>
          {brands.map(brand => {
            const { style, id: brandId } = brand
            return (
              <div style={style} key={brandId} className="brand">
                <Brand {...brand} />
                <Wrestlers brandId={brandId} style={style} />
              </div>
            )
          })}
        </div>
      </If>
    </section>
  )
}

DraftPage.propTypes = {
  brands: PropTypes.array,
  style: PropTypes.object,
}

export default DraftPage
