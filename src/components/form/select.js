import React from "react"

export default class Select extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
  }

  displayName: "Select"

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  onChange = (event) => {
    const selectedType = this.props.options.find(item => item.id === event.target.value)
    this.props.changeHandler(
      this.props.name,
      selectedType,
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
        <select
          onChange={this.onChange}>
          <option hidden>Select here</option>
          {this.props.options.map((item, index) =>
            <option value={item.id}
              key={index}>
              {item.name}
            </option>
          )}
        </select>
        <div className="select__arrow"></div>
      </div>
    )
  }
}
