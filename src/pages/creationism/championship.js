import "./stylesheets/championship"
import { connect } from "react-redux"
import ChampionshipBelt from "../../components/championship-belt/championship-belt"
import ColourPalettePicker from "../../components/form/colour-palette"
import React from "react"
import Select from "../../components/form/select"
import Checkbox from "../../components/form/checkbox"
import Model from "../../reducers/championship.model"
import Options from "./options"

const shapes = [
  "rectangle",
  "circle",
  "square",
  "oval",
]


class CreationismChampionshipPage extends React.Component {

  displayName = "CreationismChampionshipPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  state = {
    currentOptionIndex: 0,
    currentItem: {
      centerStrapShape: "circle",
      centerPlateShape: "circle",
      centerPlateColor: "gold",
      sideplateBackgroundColor: "gold",
      sideplateShape: "rectangle",
      strapBackgroundColor: "black",
      centerPlateOverflow: "true",
    },
  }

  changeHandler = (event, target) => {
    let newCurrentItem = Object.assign({}, this.state.currentItem)
    newCurrentItem[Options[this.state.currentOptionIndex].key] = target

    this.setState({
      currentItem: new Model(newCurrentItem).toJSON(),
    })
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37: // left
        case 65: //a
          this.onChangeCurrentOptionIndex(1)
          break
        case 39: // right
        case 68: //d
          this.onChangeCurrentOptionIndex(-1)
          break
      }
    }
  }

  onSave = () => {

  }

  onChangeCurrentOptionIndex = (value) => {
    let newIndex = this.state.currentOptionIndex + value

    if (newIndex === -1) {
      newIndex = Options.length - 1
    } else if (newIndex === options.length) {
      newIndex = 0
    }
    this.setState({
      currentOptionIndex: newIndex,
    })
  }

  render() {
    console.log(this.state.currentItem.centerPlateOverflow)
    const currentOption = Options[this.state.currentOptionIndex]
    const currentValue = this.state.currentItem[currentOption.key]
    let currentOptions = {
      label: currentOption.label,
      name: currentOption.key,
      defaultValue: currentValue,
      changeHandler: this.changeHandler,
    }
    return (
      <main className="page-section creationism-championship">
        <div className="inpage-content">
          <div className="row between-xs middle-xs arrows__container">
            <div className="col-xs-1 start-xs arrow__left">
              <div className="box">
                <i onClick={() => this.onChangeCurrentOptionIndex(1)}
                  className="fa fa-arrow-left"
                  aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-xs-10 center-xs championship-belt">
              <div className="box">
                <ChampionshipBelt {...this.state.currentItem} />
                <div className="options">
                  <Choose>
                    <When condition={currentOption.type === "color"}>
                      <ColourPalettePicker
                        color={currentValue}
                        {...currentOptions} />
                    </When>
                    <When condition={currentOption.type === "select"}>
                      <Select options={currentOption.options}
                        {...currentOptions} />
                    </When>
                    <When condition={currentOption.type === "checkbox"}>
                      <div>
                        <Checkbox options={currentOption.options}
                         {...currentOptions} />
                      </div>
                    </When>
                  </Choose>
                </div>
            </div>
            </div>
            <div className="col-xs-1 end-xs arrow__right">
              <div className="box">
              <i onClick={() => this.onChangeCurrentOptionIndex(-1)}
                className="fa fa-arrow-right"
                aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect()(CreationismChampionshipPage)
