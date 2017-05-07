import React from 'react'

import './button.scss'

const noop = () => {}

const Button = ({value = '', onClick = noop,}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <button
            type="submit"
            className="btn btn-simulate-month"
            onClick={onClick}
          >
            {value}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Button
