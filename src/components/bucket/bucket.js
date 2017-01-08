import "./stylesheets/bucket.scss"
import Checkbox from "../form/checkbox"
import Icon from "../icon/icon"
import Input from "../form/input"
import ColourPicker from "../form/colour"
import React from "react"
import ReadOnly from "../form/readonly"
import Select from "../form/select"

export default class Bucket extends React.Component {

  static propTypes = {
    collection: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    validation: React.PropTypes.object.isRequired,
    onSaveBucket: React.PropTypes.func.isRequired,
  }

  displayName = "Bucket"

  state = {
    currentItem: false,
  }

  onSelect = (currentItem) => {
    this.setState({
      currentItem,
    })
  }

  changeHandler = (fieldName, fieldValue) => {
    let newState = Object.assign({}, this.state.currentItem)
    newState[fieldName] = fieldValue
    this.setState({
      currentItem: {...newState},
    })
  }

  onSaveBucket = () => {
    this.props.onSaveBucket(
      this.state.currentItem,
    )
  }

  render() {
    return (
      <div className="bucket">
        <div className="bucket__collection">
          <Select
            label={this.props.name}
            collection={this.props.collection}
            onSelect={this.onSelect}
          />
        </div>
        <If condition={this.state.currentItem}>
          <div className="icon__container">
            <Icon name={this.state.currentItem.name} />
          </div>
          <form ref="form">
            <div className="bucket__edit">
              {Object.keys(this.props.validation).map((name, key) => {
                let defaultValue = this.state.currentItem[name],
                  currentFieldtype = this.props.validation[name],
                  values = {
                    name,
                    defaultValue,
                    changeHandler: this.changeHandler,
                  }
                return (
                  <div key={key}
                    className={`form-group bucket__${name}`}>
                    <span className="bucket__name">
                      {name}
                    </span>
                    <Choose>
                      <When condition={currentFieldtype === "colour"}>
                        <ColourPicker {...values} />
                      </When>
                      <When condition={currentFieldtype === "bool"}>
                        <Checkbox {...values} />
                      </When>
                      <When condition={currentFieldtype === "input"}>
                        <Input {...values} />
                      </When>
                      <When condition={currentFieldtype === "readonly"}>
                        <ReadOnly {...values} />
                      </When>
                      <Otherwise>
                        &nbsp;
                      </Otherwise>
                    </Choose>
                  </div>
                )
              })}
            </div>
          </form>
          <div>
            <button
              label="Save"
              className="btn btn-primary"
              onClick={this.onSaveBucket}>
              <i className="fa fa-save"></i> Save
            </button>
          </div>
        </If>
      </div>
    )
  }
}
