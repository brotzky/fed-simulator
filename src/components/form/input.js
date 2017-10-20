import React from "react"
import PropTypes from "prop-types"

import "./input.scss"

const NOOP = () => {}

const Input = ({ label, name, onChange, placeholder, style, value, }) => (
  <div>
    <If condition={label.length > 0}>
      <label htmlFor={name}>{label}</label>
    </If>
    <input
      tabIndex="0"
      value={value}
      id={name}
      name={name}
      style={style}
      onChange={onChange}
      onKeyDown={onChange}
      onKeyPress={onChange}
      placeholder={placeholder}
      type="text"
    />
  </div>
)

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
}

Input.defaultProps = {
  label: "",
  name: "",
  onChange: NOOP,
  placeholder: "",
  style: {},
  value: "",
}

export default Input
