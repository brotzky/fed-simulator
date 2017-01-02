import React from "react"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  onChange = (event) => this.props.changeHandler(event.target.name, event.target.value)

  render() {
    console.log("input render", this.props)
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
