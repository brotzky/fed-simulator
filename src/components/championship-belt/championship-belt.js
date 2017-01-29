import React from "react"
import "./stylesheets/championship-belt"
import sizeMe from "react-sizeme"
import leatherIMG from "./leather.png"
import metalIMG from "./metal.png"

class ChampionshipBelt extends React.Component {

  displayName = "ChampionshipBelt"

  static propTypes = {
    size: React.PropTypes.object,
    name: React.PropTypes.string,
    centerStrapShape: React.PropTypes.string,
    centerPlateShape: React.PropTypes.string,
    centerPlateColor: React.PropTypes.string,
    centerPlateBackgroundColor: React.PropTypes.string,
    sideplateBackgroundColor: React.PropTypes.string,
    strapBackgroundColor: React.PropTypes.string,
    sideplateShape: React.PropTypes.string,
    centerPlateOverflow: React.PropTypes.bool,
  }

  render() {
    const { width } = this.props.size
    const divisibleAmount = this.props.name.length > 20 ? 400 : 150
    const getFontSize = () => this.props.size.width / divisibleAmount
    const beltName = {
      fontSize: `${getFontSize()}rem`,
      color: this.props.centerPlateColor,
    }
    const buttonsContainerStyle = {
      backgroundColor: this.props.strapBackgroundColor,
      backgroundImage: `url("${leatherIMG}")`,
      color: this.props.sideplateBackgroundColor,
    }
    const buttonsStyle = {
      fontSize: `${(width / 150)}rem`,
    }
    const strapBackgroundColor = {
      backgroundColor: this.props.strapBackgroundColor,
      backgroundImage: `url("${leatherIMG}")`,
    }
    const centerPlate = {
      backgroundColor: this.props.centerPlateBackgroundColor,
      backgroundImage: `url("${metalIMG}")`,
    }
    const sidePlate = {
      backgroundColor: this.props.sideplateBackgroundColor,
      backgroundImage: `url("${metalIMG}")`,
    }
    const Buttons = ({ borderClass="first" }) => {
      return (
        <span className="container-xs">
          <span style={buttonsContainerStyle}
            className={`strap ${borderClass}`}>
            <span className="plate plate__buttons"
              style={buttonsStyle}>
              :::
            </span>
          </span>
        </span>
      )
    }
    const Sideplate = () => {
      return (
        <span className="container-sm">
          <span style={strapBackgroundColor}
            className="strap">
            <span style={sidePlate}
              className={`plate plate-sm ${this.props.sideplateShape}`}></span>
          </span>
        </span>
      )
    }
    return (
      <div className="belt">
        <Buttons />
        <Sideplate />
        <Sideplate />
        <span className="container-lg">
          <span style={strapBackgroundColor}
            className={`strap ${this.props.centerPlateOverflow ? "hide" : "show"}-overflow ${this.props.centerStrapShape}`}>
            <span style={centerPlate}
              className={`plate plate-lg ${this.props.centerPlateShape}`}>
                <span className="plate__name"
                  style={beltName}>
                  {this.props.name}
                </span>
              </span>
          </span>
        </span>
        <Sideplate />
        <Sideplate />
        <Buttons borderClass="last" />
      </div>
    )
  }
}

const config = {
  monitorHeight: true,
}

const sizeMeHOC = sizeMe(config)

export default sizeMeHOC(ChampionshipBelt)
