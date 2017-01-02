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

  state = {}

  onSelect = (currentItem) => {
    this.setState({
      currentItem,
    })
    console.log(currentItem, this.state)
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
          <form
            ref="form"
            onChange={changes => this.setState(changes)}>
            <div className="bucket__edit">
              {Object.keys(this.props.validation).map((name, value) => {
                let initialValue = this.state.currentItem[name],
                  currentFieldtype = this.props.validation[name]
                return (
                  <div key={name}
                    className={`bucket__${name}`}>
                    <strong>{name}: </strong>
                    <Choose>
                      <When condition={currentFieldtype === "bool"}>
                        <Checkbox
                          name={name}
                          initialValue={initialValue}
                        />
                      </When>
                      <When condition={currentFieldtype === "input"}>
                        <Input
                          name={name}
                          initialValue={initialValue}
                        />
                      </When>
                      <When condition={currentFieldtype === "readonly"}>
                        <ReadOnly
                          name={name}
                          initialValue={initialValue}
                        />
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
