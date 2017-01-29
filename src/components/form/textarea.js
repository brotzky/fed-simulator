import React from "react"
import "./stylesheets/textarea"

export default class Textarea extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
      active: false,
    }
  }

  onFocus = () => {
    this.setState({
      active: true,
    })
  }

  onBlur = () => {
    this.setState({
      active: false,
    })
  }

  onChange = (event) => {
    this.props.changeHandler(
      this.props.name,
      event.target.value,
    )
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <textarea type="textarea"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={`form__textarea form-control ${this.state.active ? "active" : "inactive"}`}
          name={this.props.name}
          defaultValue={this.props.defaultValue}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
