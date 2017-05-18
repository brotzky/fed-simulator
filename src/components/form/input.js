import React from "react"

const noop = () => {}

const Input = ({
  value = "",
  label = "",
  name = "",
  onChange = noop,
  placeholder = "",
}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <label htmlFor={name}>
            {label}
          </label>
          <input
            value={value}
            id={name}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>
    </div>
  )
}

export default Input
