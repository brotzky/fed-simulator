import _cloneDeep from "lodash.clonedeep"
import "./stylesheets/bucket.scss"
import Form from "../form/form"
import React from "react"
import PropTypes from "prop-types"
import Select from "../form/select"

export default class Bucket extends React.Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    skeleton: PropTypes.array.isRequired,
  }

  displayName = "Bucket"

  state = {
    currentId: false,
    currentItem: false,
  }

  onSelect = (selectName, id) => {
    let currentItem = this.props.options.find(option => option.id === id)
    this.setState({
      currentId: id,
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

  onSave = (newState) => {
    newState = Object.assign(this.state.currentItem, newState)
    this.props.onSave({
      ...newState,
    })
    this.setState({
      currentItem: newState,
    })
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
            <Select name={this.props.name}
              label={this.props.name}
              options={this.props.options}
              changeHandler={this.onSelect}
            />
          </article>
        </div>
        <If condition={this.state.currentItem}>
          <Form
            id={this.state.currentId}
            onSave={this.onSave}
            skeleton={this.getSkeleton()}
            changeHandler={this.changeHandler}
          />
        </If>
      </div>
    )
  }
}
