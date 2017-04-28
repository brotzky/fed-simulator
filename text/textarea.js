import React from 'react'

const noop = () => {}

const Textarea = ({
  defaultValue = '',
  label,
  name,
  onChange = noop,
  placeholder = '',
  rows = 3,
}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <label htmlFor={name}>
            {label}
          </label>
          <textarea
            id={name}
            type="text"
            rows={rows}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Textarea
