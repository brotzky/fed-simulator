import React from "react"

export default class ReadOnly extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        readOnly
      />
    )
  }
}
