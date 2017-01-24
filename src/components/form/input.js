import React from "react"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
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
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
