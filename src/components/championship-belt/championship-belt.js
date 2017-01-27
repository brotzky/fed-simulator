import React from "react"
import "./stylesheets/championship-belt"

export default class ChampionshipBelt extends React.Component {

  displayName = "ChampionshipBelt"

  static propTypes = {
    centerStrapShape: React.PropTypes.string,
    centerPlateShape: React.PropTypes.string,
    centerPlateColor: React.PropTypes.string,
    sideplateBackgroundColor: React.PropTypes.string,
    strapBackgroundColor: React.PropTypes.string,
    sideplateShape: React.PropTypes.string,
  }

  render() {
    const strapBackgroundColor = {
      backgroundColor: this.props.strapBackgroundColor
    }
    const sideplateBackgroundColor = {
      backgroundColor: this.props.sideplateBackgroundColor,
    }
    return (
      <div className="belt">

        <span style={{
            backgroundColor: this.props.strapBackgroundColor,
            color: this.props.sideplateBackgroundColor,
          }}
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
          className={`strap strap-lg ${this.props.centerStrapShape}`}>
          <span style={{
              backgroundColor: this.props.centerPlateColor,
            }}
            className={`plate plate-lg ${this.props.centerPlateShape}`}></span>
        </span>

        <span style={strapBackgroundColor}
          className="strap strap-sm">
          <span style={sideplateBackgroundColor}
            className={`plate plate-sm ${this.props.sideplateShape}`}></span>
        </span>

        <span style={{
            backgroundColor: this.props.strapBackgroundColor,
            color: this.props.sideplateBackgroundColor,
          }}
          className="strap strap-sm last">
          <span className="plate plate-sm buttons">
            <full-width-text>::::</full-width-text>
          </span>
        </span>

      </div>
    )
  }
}
