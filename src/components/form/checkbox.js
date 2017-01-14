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
      <input type="checkbox"
        className="form-control"
        name={this.props.name}
        value={this.props.defaultValue}
        checked={this.props.defaultValue}
        onChange={this.onChange}
      />
    )
  }
}
