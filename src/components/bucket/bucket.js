import React from "react"
import Select from "../select/select"
import Input from "./input"
import ReadOnly from "./readonly"
import Checkbox from "./checkbox"
import classNames from "classnames"

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
      currentItem: {...newState}
    })
  }

  render() {
    return (
      <div className="bucket">
        <div className="bucket__collection">
          <Select
            ref="bucket-value"
            label={this.props.name}
            collection={this.props.collection}
            onSelect={this.onSelect}
          />
        </div>
        <If condition={this.state.currentItem}>
          <form ref="form">
            <div className="bucket__edit">
              {Object.keys(this.props.validation).map((name, value) => {
                let defaultValue = this.state.currentItem[name],
                  currentFieldtype = this.props.validation[name],
                  values = {
                    name,
                    defaultValue,
                    changeHandler: this.changeHandler,
                  }
                return (
                  <div key={name}
                    className={`bucket__${name}`}>
                    <strong>{name}: </strong>
                    <Choose>
                      <When condition={currentFieldtype === "bool"}>
                        <Checkbox {...values} />
                      </When>
                      <When condition={currentFieldtype === "input"}>
                        <Input {...values} />
                      </When>
                      <When condition={currentFieldtype === "readonly"}>
                        <ReadOnly {...values} />
                      </When>
                    </Choose>
                  </div>
                )
              })}
            </div>
          </form>
          <div>
            <button
              label="Save"
              onClick={() => this.refs.form.submit()}>
              Save
            </button>
          </div>
        </If>
      </div>
    )
  }
}
