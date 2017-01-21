import "./stylesheets/bucket.scss"
import Checkbox from "../form/checkbox"
import Icon from "../icon/icon"
import Input from "../form/input"
import Image from "../form/image"
import ColourPicker from "../form/colour"
import { GithubPicker, SketchPicker } from "react-color"
import React from "react"
import ReadOnly from "../form/readonly"
import Select from "../form/select"
import Colors from "./colors"

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

  onSaveBucket = (event) => {
    event.preventDefault()

    console.log(this.state)
    this.props.onSaveBucket(
      this.state.currentItem,
    )
  }

  render() {
    return (
      <div className="bucket">
        <div className="bucket__collection">
          <article className="form">
            <Select label={this.props.name}
              collection={this.props.collection}
              onSelect={this.onSelect}
            />
          </article>
        </div>
        <If condition={this.state.currentItem}>
          <article className="form">
            <form ref="form">
              <div className="bucket__edit">
                {Object.keys(this.props.validation).map((name, key) => {
                  let defaultValue = this.state.currentItem[name],
                    currentFieldtype = this.props.validation[name],
                    values = {
                      name,
                      label: name,
                      defaultValue,
                      changeHandler: this.changeHandler,
                    }
                    console.log(values)
                  return (
                    <div key={key}
                      className={`form-group bucket__${name}`}>
                      <Choose>
                      <When condition={currentFieldtype === "colour"}>
                        <ColourPicker {...values} />
                      </When>
                      <When condition={currentFieldtype === "color-github"}>
                        <GithubPicker colors={Colors} />
                      </When>
                      <When condition={currentFieldtype === "bool"}>
                        <Checkbox {...values} />
                      </When>
                      <When condition={currentFieldtype === "input"}>
                        <Input {...values} />
                      </When>
                      <When condition={currentFieldtype === "select"}>
                        <Select value={values.defaultValue}
                          onChange={this.changeHandler} />
                      </When>
                      <When condition={currentFieldtype === "readonly"}>
                        <ReadOnly {...values} />
                      </When>
                      <When condition={currentFieldtype === "image"}>
                        <Image {...values} />
                      </When>
                      <Otherwise>
                        &nbsp;
                      </Otherwise>
                    </Choose>
                  </div>
                  )
                })}
              </div>
              <div>
                <button
                  label="Save"
                  className="btn btn-primary"
                  onClick={this.onSaveBucket}>
                  <i className="fa fa-save"></i> Save
                </button>
              </div>
            </form>
          </article>
        </If>
      </div>
    )
  }
}
