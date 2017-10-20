import React from "react"
import PropTypes from "prop-types"

import Input from "../form/input"

import { ADD_BRAND_ENTRY } from "../../constants/confirmations"

import "./add-brand.scss"

const NOOP = () => {}

const AddBrand = ({ name, style, updateName, }) => {
  return (
    <div className="add-brand wrapper">
      <span className="icon fa fa-plus-circle" />
      <Input tabIndex="0" placeholder={ADD_BRAND_ENTRY} style={style} type="text" value={name} onChange={updateName} />
    </div>
  )
}

AddBrand.displayName = "AddBrand"

AddBrand.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  updateName: PropTypes.func,
}

AddBrand.defaultProps = {
  name: "",
  style: {},
  updateName: NOOP,
}

export default AddBrand
