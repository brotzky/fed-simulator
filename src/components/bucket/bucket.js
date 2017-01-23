import "./stylesheets/bucket.scss"
import Select from "../form/select"
import Form from "../form/form"
import _cloneDeep from "lodash.clonedeep"
import React from "react"

export default class Bucket extends React.Component {

  static propTypes = {
    options: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    onSaveBucket: React.PropTypes.func.isRequired,
    skeleton: React.PropTypes.array.isRequired,
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
      currentItem: {
        ...newState,
      },
    })
  }

  onSaveBucket = (event) => {
    event.preventDefault()

    this.props.onSaveBucket(
      this.state.currentItem,
    )
  }

  getSkeleton() {
    let formSkeleton = _cloneDeep(this.props.skeleton)
    return formSkeleton.map((item) => {
      item.value = this.state.currentItem[item.name] || item.value
      return item
    })
  }

  render() {
    return (
      <div className="bucket">
        <div className="bucket__collection">
          <article className="form">
            <Select name={this.props.name} label={this.props.name}
              options={this.props.options}
              changeHandler={this.onSelect}
            />
          </article>
        </div>
        <If condition={this.state.currentItem}>
          <Form
            skeleton={this.getSkeleton()}
            onSave={this.onSaveBucket} />
        </If>
      </div>
    )
  }
}
