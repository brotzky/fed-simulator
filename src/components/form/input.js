import React from "react"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue,
    })
  }

  componentWillMount() {
    this.setState({
      value: this.props.defaultValue,
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
        <input type="text"
          className="form-control"
          name={this.props.name}
          defaultValue={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
