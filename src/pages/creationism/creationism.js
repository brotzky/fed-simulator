import "./stylesheets/creationism"
import { connect } from "react-redux"
import { hashCode } from "../../helpers/hash"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import * as ppvsAction from "../../actions/ppvs"
import * as settingsAction from "../../actions/settings"
import * as wrestlersAction from "../../actions/wrestlers"
import Form from "../../components/form/form"
import Helmet from "react-helmet"
import Presets from "./presets"
import React from "react"
import Resets from "../../components/navigation/resets"
import Skeleton from "./skeleton"
import _cloneDeep from "lodash.clonedeep"

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
    const splitToArray = ["maleWrestlers", "femaleWrestlers", "ppvs", "championships"]
    splitToArray.forEach(splitter => {
      formData[splitter] = textareaToArray(formData[splitter])
    })

    // brand
    let newBrand = {
      id: hashCode(formData.brand),
      name: formData.brand,
      image: formData.image,
      bgColour: formData.bgColour,
      textColour: formData.textColour,
      default: false,
    }
    this.props.dispatch(
      brandsAction.create(newBrand)
    )

    // championship
    formData.championships.forEach(championshipName => {
      this.props.dispatch(
        championshipAction.create({
          id: hashCode(championshipName),
          name: championshipName,
          brand: formData.brand,
        })
      )
    })
    // wrestlers
    let wrestlers = []
    formData.femaleWrestlers.forEach(wrestlersName => {
      wrestlers.push({
        id: hashCode(wrestlersName),
        name: wrestlersName,
        brand: formData.brand,
        male: false,
      })
    })
    formData.maleWrestlers.forEach(wrestlersName => {
      wrestlers.push({
        id: hashCode(wrestlersName),
        name: wrestlersName,
        brand: formData.brand,
        male: true,
      })
    })
    this.props.dispatch(
      wrestlersAction.createMany(
        wrestlers,
      )
    )
    // ppvs
    formData.ppvs.forEach(ppvName => {
      this.props.dispatch(
        ppvsAction.create({
          id: hashCode(ppvName),
          name: ppvName,
          defaultBrand: formData.brand,
          sequence: 0,
        })
      )
    })
  }

  getPresetSkeleton(preset) {
    let formSkeleton = _cloneDeep(Skeleton)
    return formSkeleton.map((item, key) => {
      item.value = preset[item.name] || item.value
      return item
    })
  }

  render() {
    return (
      <main className="page-section creationism">
        <Helmet title="Creationism" />
        <Resets />
        <div className="inpage-content">
          <div className="row">
            {Presets.map((preset, key) => {
              let formSkeleton = this.getPresetSkeleton(preset)
              console.log(formSkeleton[0].value)
              return(
                <div key={key}
                  className="col-xs-12 col-lg-2">
                  <Form
                    onSave={this.onSave}
                    skeleton={formSkeleton}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </main>
    )
  }
}

export default connect(state => ({
}))(CreationismPage)
