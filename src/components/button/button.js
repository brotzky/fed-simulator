import React from "react"
import classnames from "classnames"

import "./button.scss"

const noop = () => {}

const Button = ({ value = "", children = "", classes = "", onClick = noop, }) =>
  <div className="row">
    <div className="col-xs-12">
      <div className="box">
        <button
          type="submit"
          className={classnames("btn", classes)}
          onClick={onClick}
        >
          {value ? value : children}
        </button>
      </div>
    </div>
  </div>

export default Button
