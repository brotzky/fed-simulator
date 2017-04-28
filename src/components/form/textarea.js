import React from 'react'

const noop = () => {}

const Textarea = ({
  value = '',
  label = '',
  name = '',
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
            value={value}
            id={name}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            type="text"
          />
        </div>
      </div>
    </div>
  )
}

export default Textarea
