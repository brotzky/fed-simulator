import React, { Component } from "react"
import PropTypes from "prop-types"

import "./select.scss"

const NOOP = () => {}

class Select extends Component {
  render() {
    let { value, } = this.props
    const { name, onChange, } = this.props

    if (value === null) {
      value = ""
    }

    const options = this.props.options.map(value => (
      <option key={value.id} value={value.id}>
        {value.name}
      </option>
    ))

    return (
      <select name={name} ref={name} value={value} onChange={onChange}>
        {options}
      </select>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.any,
}

Select.defaultProps = {
  name: "",
  onChange: NOOP,
  options: [],
  value: "",
  error: "",
}

export default Select
