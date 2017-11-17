import React from "react"
import PropTypes from "prop-types"

import Input from "../form/input"
import { Create } from "../icons"

import "./create.scss"

const NOOP = () => {}

const CreateInput = ({ name = "", style = {}, updateName = NOOP, placeholder = "Enter a name and hit enter!", }) => {
  return (
    <div className="create wrapper">
      <Create />
      <Input tabIndex="0" placeholder={placeholder} style={style} type="text" value={name} onChange={updateName} />
    </div>
  )
}

CreateInput.displayName = "Create"

CreateInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  updateName: PropTypes.func,
}

export default CreateInput
