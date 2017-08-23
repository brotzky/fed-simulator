import React from "react"
import PropTypes from "prop-types"

import Input from "../form/input"

const NOOP = () => {}

const AddBrand = ({ name = "", updateName = NOOP, }) => {
  return <Input type="text" value={name} onChange={updateName} />
}

AddBrand.displayName = "AddBrand"

export default AddBrand
