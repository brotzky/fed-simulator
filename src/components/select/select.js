import React from "react"

export default class Select extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    collection: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  }

  displayName: "Select"

  onChangeSelect = (event) => {
    const selectedType = this.props.collection.find(item => item.id === event.target.value)
    this.props.onSelect(selectedType)
  }

  render() {
    return (
      <div className="form-group">
        <label>
          {this.props.label}
          <select className="form-control"
            onChange={this.onChangeSelect}>
            {this.props.collection.map((item, index) =>
              <option value={item.id}
                key={index}>
                {item.name}
              </option>
            )}
          </select>
        </label>
      </div>
    )
  }
}
