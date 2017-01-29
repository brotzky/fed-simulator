import React from "react"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    value: React.PropTypes.any,
  }

  static defaultProps = {
    value: "",
    label: "",
    name: "",
    maxLength: 2000,
    changeHandler: () => {},
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
          maxLength={this.props.maxLength}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
