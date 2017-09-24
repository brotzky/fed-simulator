import React from "react"
import PropTypes from "prop-types"

import Input from "../form/input"

import { ADD_BRAND_ENTRY } from "../../constants/confirmations"

const NOOP = () => {}

const AddBrand = ({ name, style, updateName, }) => {
  return (
    <div className="wrapper">
      <span className="icon fa fa-plus-circle" />
      <Input placeholder={ADD_BRAND_ENTRY} style={style} type="text" value={name} onChange={updateName} />
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
