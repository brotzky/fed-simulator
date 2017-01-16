import React from "react"

export default class Checkbox extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  static defaultProps = {
    defaultValue: false,
  }

  onChange = () => {
    const newValue = !this.props.defaultValue
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
          value={this.props.defaultValue}
          checked={this.props.defaultValue}
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
