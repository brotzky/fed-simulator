import "./stylesheets/championship"
import { connect } from "react-redux"
import ChampionshipBelt from "../../components/championship-belt/championship-belt"
import ColourPalettePicker from "../../components/form/colour-palette"
import React from "react"
import Select from "../../components/form/select"

const shapes = [
  "rectangle",
  "circle",
  "square",
  "oval",
]

const options = [
  {
    key: "centerStrapShape",
    type: "shape",
    label: "Center strap shape",
  },
  {
    key: "centerPlateShape",
    type: "shape",
    label: "Center plate shape",
  },
  {
    key: "centerPlateColor",
    type: "color",
    label: "Center plate color",
  },
  {
    key: "sideplateBackgroundColor",
    type: "color",
    label: "Sideplate background color",
  },
  {
    key: "sideplateShape",
    type: "shape",
    label: "Sideplate Shape",
  },
  {
    key: "strapBackgroundColor",
    type: "color",
    label: "Strap Color",
  }
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
    },
  }

  changeHandler = (event, target) => {
    let newCurrentItem = Object.assign({}, this.state.currentItem)
    newCurrentItem[options[this.state.currentOptionIndex].key] = target

    this.setState({
      currentItem: newCurrentItem,
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
      this.move({
        ...newState
      })
    }
  }

  onSave = () => {

  }

  onChangeCurrentOptionIndex = (value) => {
    let newIndex = this.state.currentOptionIndex + value

    if (newIndex === -1) {
      newIndex = options.length - 1
    } else if (newIndex === options.length) {
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
                      <ColourPalettePicker
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
