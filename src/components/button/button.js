import React from "react"

import "./button.scss"

const noop = () => {}

const Button = ({ value = "", children = "", onClick = noop, }) =>
  <div className="row">
    <div className="col-xs-12">
      <div className="box">
        <button type="submit" className="btn" onClick={onClick}>
          {value ? value : children}
        </button>
      </div>
    </div>
  </div>

export default Button
