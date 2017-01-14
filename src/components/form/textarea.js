import React from "react"

export default class Textarea extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  onChange = (event) => this.props.changeHandler(this.props.name, event.target.value)

  render() {
    return (
      <textarea
        type="textarea"
        className="form-control"
        name={this.props.name}
        onChange={this.onChange}
        defaultValue={this.props.defaultValue}
      />
    )
  }
}
