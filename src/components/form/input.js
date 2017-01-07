import React from "react"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  onChange = (event) => this.props.changeHandler(this.props.name, event.target.value)

  render() {
    return (
      <input
        type="text"
        className="form-control"
        name={this.props.name}
        value={this.props.defaultValue}
        onChange={this.onChange}
      />
    )
  }
}
