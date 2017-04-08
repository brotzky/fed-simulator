import React from "react"
import PropTypes from "prop-types"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    value: PropTypes.any,
  }

  static defaultProps = {
    value: "",
    label: "",
    name: "",
    maxLength: 2000,
    changeHandler: () => {},
  }

  shouldComponentUpdate(nextProps) {
    return this.state.value !== nextProps.defaultValue
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
