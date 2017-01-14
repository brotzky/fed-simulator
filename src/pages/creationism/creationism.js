import { connect } from "react-redux"
import { hashCode } from "../../helpers/hash"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import * as settingsAction from "../../actions/settings"
import * as wrestlersAction from "../../actions/wrestlers"
import * as ppvsAction from "../../actions/ppvs"
import Form from "./form"
import Helmet from "react-helmet"
import React from "react"
import skeleton from "./skeleton"

class CreationismPage extends React.Component {

  displayName = "CreationismPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  state = {
    currentItem: false,
  }

  changeHandler = (fieldName, fieldValue) => {
    let newState = Object.assign({}, this.state.currentItem)
    newState[fieldName] = fieldValue
    this.setState({
      currentItem: {...newState},
    })
  }

  onSave = (formData) => {
    const textareaToArray = (value) => value.split(",").filter(item => item !== "").map(item => item.trim())
    const splitToArray = ["wrestlers", "ppvs", "championships"]
    splitToArray.forEach(splitter => {
      formData[splitter] = textareaToArray(formData[splitter])
    })
    // brand
    let brand = {
      id: hashCode(formData.brand),
      name: formData.brand,
      bgColour: formData.bgColour,
      textColour: formData.textColour,
    }
    this.props.dispatch(
      brandsAction.create(brand)
    )

    // championship
    formData.championships.forEach(championshipName => {
      this.props.dispatch(
        championshipAction.create({
          id: hashCode(championshipName),
          name: championshipName,
          brand: formData.brand,
          male: true,
          sequence: 0,
          changes: 0,
          canMoveBrands: true,
          wrestlers: [],
        })
      )
    })
    // wrestlers
    formData.wrestlers.forEach(wrestlersName => {
      this.props.dispatch(
        wrestlersAction.create({
          id: hashCode(wrestlersName),
          name: wrestlersName,
          brand: formData.brand,
          male: true,
          rating: 80,
          sequence: 0,
          wins: 0,
          losses: 0,
        })
      )
    })
    // ppvs
    formData.ppvs.forEach(ppvName => {
      this.props.dispatch(
        ppvsAction.create({
          id: hashCode(ppvName),
          name: ppvName,
          defaultBrand: formData.brand,
          sequence: 0,
          attendance: {
            min: 1000,
            max: 15000,
          }
        })
      )
    })
  }

  render() {
    return (
      <main className="page creationism">
        <Helmet title="Creationism" />
        <div className="inpage-content">
          <div className="row">
            <div className="col-xs-4">
              <Form
                onSave={this.onSave}
                skeleton={skeleton.Raw}
              />
            </div>
            <div className="col-xs-4">
              <Form
                onSave={this.onSave}
                skeleton={skeleton.Smackdown}
              />
            </div>
            <div className="col-xs-4">
              <Form
                onSave={this.onSave}
                skeleton={skeleton.NXT}
              />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(state => ({
}))(CreationismPage)
