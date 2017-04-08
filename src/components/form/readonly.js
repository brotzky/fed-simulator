import React from "react"
import PropTypes from "prop-types"

export default class ReadOnly extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <input type="text"
          className="form-control"
          name={this.props.name}
          value={this.props.defaultValue}
          readOnly
        />
      </div>
    )
  }
}
