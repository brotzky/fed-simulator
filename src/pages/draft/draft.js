import React from "react"
import PropTypes from "prop-types"

import Wrestlers from "../../components/wrestlers/container"
import Brand from "../../components/brand/brand"

import "./draft.scss"

const defaultBrand = {
  id: 0,
  name: "Roster",
  style: { color: "white", backgroundColor: "gray", },
}

const DraftPage = ({ brands = [], }) => {
  return (
    <section className="page draft">
      <div style={defaultBrand.style} className="brand">
        <Brand {...defaultBrand} />
        <Wrestlers style={defaultBrand.style} />
      </div>
      {brands.map(brand => {
        const { style, id: brandId, } = brand
        return (
          <div style={style} key={brandId} className="brand">
            <Brand {...brand} />
            <Wrestlers brandId={brandId} style={style} />
          </div>
        )
      })}
    </section>
  )
}

DraftPage.propTypes = {
  brands: PropTypes.array,
}

export default DraftPage
