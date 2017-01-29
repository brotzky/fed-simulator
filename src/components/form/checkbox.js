import React from "react"

export default class Checkbox extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue,
    })
  }

  static defaultProps = {
    defaultValue: false,
  }

  onChange = () => {
    const newValue = !this.state.value
    this.props.changeHandler(
      this.props.name,
      newValue,
    )
    this.setState({
      value: newValue,
    })
  }

  render() {
    return (
      <div>
        <input id={this.props.name}
          name={this.props.name}
          value={this.state.value}
          defaultChecked={this.state.value}
          onChange={this.onChange}
          className="checkbox-custom"
          type="checkbox" />
        <label htmlFor={this.props.name} className="checkbox-custom-label">
          {this.props.label}
        </label>
      </div>
    )
  }
}
