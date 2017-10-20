import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./button.scss"

const NOOP = () => {}

const Button = ({ value = "", children = {}, classes = "", onClick = NOOP, }) => (
  <div className="row">
    <div className="col-xs-12">
      <div className="box">
        <button type="submit" tabIndex="0" className={classnames("btn", classes)} onKeyPress={onClick} onClick={onClick}>
          {value ? value : children}
        </button>
      </div>
    </div>
  </div>
)

Button.defaultProps = {
  value: "",
  classes: "",
  onClick: NOOP,
}

Button.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func,
}
export default Button
