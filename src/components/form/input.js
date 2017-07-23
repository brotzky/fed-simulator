import React from "react"

const noop = () => {}

const Input = ({
  value = "",
  label = "",
  name = "",
  onChange = noop,
  placeholder = "",
}) =>
  <div>
    <If condition={label.length > 0}>
      <label htmlFor={name}>
        {label}
      </label>
    </If>
    <input
      value={value}
      id={name}
      name={name}
      onChange={onChange}
      onKeyDown={onChange}
      onKeyPress={onChange}
      placeholder={placeholder}
      type="text"
    />
  </div>

export default Input
