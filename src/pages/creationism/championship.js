import "./stylesheets/championship"
import { connect } from "react-redux"
import ChampionshipBelt from "../../components/championship-belt/championship-belt"
import Chrome from "react-color"
import ColourPicker from "../../components/form/colour"
import React from "react"
import Select from "../../components/form/select"

const shapes = [
  "square",
  "rectangle",
  "circle",
  "pentagon",
  "hexagon",
]

const options = [
  {
    key: "centerStrapShape",
    type: "shape",
    label: "Main Strap Shape",
  },
  {
    key: "centerBackgroundColor",
    type: "color",
    label: "Main Background Color",
  },
  {
    key: "centerPlateShape",
    type: "shape",
    label: "Main Plate Shape",
  },
  {
    key: "centerPlateColor",
    type: "color",
    label: "Main Plate Name Color",
  },
  {
    key: "sideplateBackgroundColor",
    type: "color",
    label: "Sideplate Background Color",
  },
  {
    key: "sideplateShape",
    type: "shape",
    label: "Sideplate Shape",
  },
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
      centerBackgroundColor: "black",
      sideplateBackgroundColor: "gold",
      sideplateShape: "rectangle",
    },
  }

  changeHandler = () => {

  }

  onSave = () => {

  }

  onChangeCurrentOptionIndex = (value) => {
    let newIndex = this.state.currentOptionIndex + value

    if (newIndex === -1) {
      newIndex = options.length - 1
    } else if (newIndex === options.length -1) {
      newIndex = 0
    }
    this.setState({
      currentOptionIndex: newIndex,
    })
  }

  render() {
    const currentOption = options[this.state.currentOptionIndex]
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
                      <ColourPicker
                        color={currentValue}
                        {...currentOptions} />
                    </When>
                    <When condition={currentOption.type === "shape"}>
                      <Select options={shapes}
                        {...currentOptions} />
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
