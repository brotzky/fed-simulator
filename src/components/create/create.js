import React from "react"
import PropTypes from "prop-types"

import Input from "../form/input"

import "./create.scss"

const NOOP = () => {}

const Create = ({ name, style, updateName, placeholder }) => {
  return (
    <div className="create wrapper">
      <span className="icon fa fa-plus-circle" />
      <Input tabIndex="0" placeholder={placeholder} style={style} type="text" value={name} onChange={updateName} />
    </div>
  )
}

Create.displayName = "Create"

Create.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
  style: PropTypes.object,
  updateName: PropTypes.func,
}

Create.defaultProps = {
  name: "",
  style: {},
	placeholder: "Enter a name and hit enter!",
  updateName: NOOP,
}

export default Create
