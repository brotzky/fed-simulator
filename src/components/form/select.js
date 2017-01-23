import React from "react"

export default class Select extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    collection: React.PropTypes.array.isRequired,
    changeHandler: React.PropTypes.func.isRequired,
  }

  displayName: "Select"

  onChange = (event) => {
    const selectedType = this.props.collection.find(item => item.id === event.target.value)
    this.props.changeHandler(selectedType)
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
          {this.props.collection.map((item, index) =>
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
