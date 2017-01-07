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

  onChange = () => this.props.changeHandler(this.props.name, !this.props.defaultValue)

  render() {
    return (
      <input
        type="checkbox"
        className="form-control"
        name={this.props.name}
        value={this.props.defaultValue}
        checked={this.props.defaultValue}
        onChange={this.onChange}
      />
    )
  }
}
