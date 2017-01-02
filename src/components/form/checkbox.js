import React from "react"

export default class Checkbox extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.bool,
  }

  static defaultProps = {
    defaultValue: false,
  }

  onChange = (event) => this.props.changeHandler(event.target.name, !this.props.defaultValue)

  render() {
    return (
      <input
        type="checkbox"
        className="form-control"
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        checked={this.props.defaultValue}
        onChange={this.onChange}
      />
    )
  }
}
