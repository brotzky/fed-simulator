import React from "react"
import PropTypes from "prop-types"

export default class Select extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    changeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  displayName: "Select"

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.state.value !== nextProps.defaultValue
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue,
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
      <div className="select">
        <label>
          {this.props.label}
        </label>
        <select value={this.state.value}
          onChange={this.onChange}>
          <option hidden>Select here</option>
          {this.props.options.map((item, index) => {
            item = typeof(item) === "object"
              ? item
              : {
                  name: item,
                  id: item,
                }
            return (
              <option value={item.id}
                key={index}>
                {item.name}
              </option>
            )
          })}
        </select>
        <div className="select__arrow"></div>
      </div>
    )
  }
}
