import React, { Component } from "react"
import PropTypes from "prop-types"

import "./select.scss"

const NOOP = () => {}

class Select extends Component {
  render() {
    const { name, value, onChange, error, } = this.props

    const options = this.props.options.map(value => (
      <option key={value.id} value={value.id}>
        {value.name}
      </option>
    ))

    return (
      <div className="custom-select">
        <select name={name} ref={name} value={value} onChange={onChange}>
          {options}
        </select>
        <div className="input">{error}</div>
      </div>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.any,
  error: PropTypes.string,
}

Select.defaultProps = {
  name: "",
  onChange: NOOP,
  options: [],
  value: "",
  error: "",
}

export default Select
