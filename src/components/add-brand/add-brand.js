import React from "react"
import PropTypes from "prop-types"

import Input from "../form/input"

const NOOP = () => {}
const PLACEHOLDER = "Type a brand name and hit enter"

const AddBrand = ({ name = "", style = {}, updateName = NOOP, }) => {
  return (
    <div className="wrapper">
      <span className="icon fa fa-plus-circle" />
      <Input
        placeholder={PLACEHOLDER}
        style={style}
        type="text"
        value={name}
        onChange={updateName}
      />
    </div>
  )
}

AddBrand.displayName = "AddBrand"

AddBrand.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  updateName: PropTypes.func,
}

export default AddBrand
