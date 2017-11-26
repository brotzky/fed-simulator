import React from "react"
import PropTypes from "prop-types"

import { Droppable } from "react-drag-and-drop"
import HeaderOne from "../../components/header/header"
import Wrestlers from "../../components/wrestlers/container"
import { Label } from "../../components/labels/labels"
import Create from "../../components/create/brand.container"

import { ADD_BRAND_ENTRY } from "../../constants/confirmations"

import "./draft.scss"

const NOOP = () => {}

const defaultBrand = {
  id: 0,
  name: "All",
  style: { color: "white", backgroundColor: "gray", },
}

const DraftPage = ({ brands = [], style = {}, onDrop = NOOP, }) => (
  <section className="page draft">
    <HeaderOne>Draft</HeaderOne>
    <If condition={brands.length === 0}>
      <Create placeholder={ADD_BRAND_ENTRY} />
    </If>
    <If condition={brands.length > 0}>
      <div className="brands">
        <div style={defaultBrand.style} className="brand">
          <h3>{defaultBrand.name}</h3>
          <Wrestlers showToggleBrand={true} style={defaultBrand.style} />
        </div>
        {brands.map(brand => {
          const { style, id: brandId, } = brand
          return (
            <div key={brandId} style={style} className="brand">
              <h3>{brand.name}</h3>
              <Droppable types={["wrestler",]} onDrop={event => onDrop(brandId, event)}>
                <Wrestlers brandId={brandId} style={style} />
              </Droppable>
            </div>
          )
        })}
      </div>
    </If>
  </section>
)

DraftPage.propTypes = {
  brands: PropTypes.array,
  style: PropTypes.object,
  onDrop: PropTypes.func,
}

export default DraftPage
