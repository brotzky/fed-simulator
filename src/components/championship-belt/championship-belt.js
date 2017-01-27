import React from "react"
import "./stylesheets/championship-belt"
import leatherIMG from "./leather.png"
import metalIMG from "./metal.png"

export default class ChampionshipBelt extends React.Component {

  displayName = "ChampionshipBelt"

  static propTypes = {
    centerStrapShape: React.PropTypes.string,
    centerPlateShape: React.PropTypes.string,
    centerPlateColor: React.PropTypes.string,
    sideplateBackgroundColor: React.PropTypes.string,
    strapBackgroundColor: React.PropTypes.string,
    sideplateShape: React.PropTypes.string,
    centerPlateOverflow: React.PropTypes.bool,
  }

  render() {
    const buttonsStyle = {
      backgroundColor: this.props.strapBackgroundColor,
      backgroundImage: `url("${leatherIMG}")`,
      color: this.props.sideplateBackgroundColor,
    }
    const strapBackgroundColor = {
      backgroundColor: this.props.strapBackgroundColor,
      backgroundImage: `url("${leatherIMG}")`,
    }
    const sideplateBackgroundColor = {
      backgroundColor: this.props.sideplateBackgroundColor,
      backgroundImage: `url("${metalIMG}")`,
    }
    return (
      <div className="belt">

        <span style={buttonsStyle}
          className="strap strap-sm first">
          <span className="plate plate-sm buttons">
            <full-width-text>::::</full-width-text>
          </span>
        </span>

        <span style={strapBackgroundColor}
          className="strap strap-sm">
          <span style={sideplateBackgroundColor}
            className={`plate plate-sm ${this.props.sideplateShape}`}></span>
        </span>

        <span style={strapBackgroundColor}
          className={`strap strap-lg ${this.props.centerPlateOverflow ? "hide" : "show"}-overflow ${this.props.centerStrapShape}`}>
          <span style={{
              backgroundColor: this.props.centerPlateColor,
              backgroundImage: `url("${metalIMG}")`,
            }}
            className={`plate plate-lg ${this.props.centerPlateShape}`}></span>
        </span>

        <span style={strapBackgroundColor}
          className="strap strap-sm">
          <span style={sideplateBackgroundColor}
            className={`plate plate-sm ${this.props.sideplateShape}`}></span>
        </span>

        <span style={buttonsStyle}
          className="strap strap-sm last">
          <span className="plate plate-sm buttons">
            <full-width-text>::::</full-width-text>
          </span>
        </span>

      </div>
    )
  }
}
