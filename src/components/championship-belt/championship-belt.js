import React from "react"
import "./stylesheets/championship-belt"

export default class ChampionshipBelt extends React.Component {

  displayName = "ChampionshipBelt"

  static propTypes = {
    centerStrapShape: React.PropTypes.string,
    centerPlateShape: React.PropTypes.string,
    centerPlateColor: React.PropTypes.string,
    centerBackgroundColor: React.PropTypes.string,
    sideplateBackgroundColor: React.PropTypes.string,
    sideplateShape: React.PropTypes.string,
  }

  render() {
    return (
      <div className="belt">
        <span className="strap strap-sm">
          <span className="plate plate-sm buttons">
            <full-width-text>::::</full-width-text>
          </span>
        </span>
        <span className="strap strap-sm">
          <span style={{
              backgroundColor: this.props.sideplateBackgroundColor
            }}
            className={`plate plate-sm ${this.props.sideplateShape}`}></span>
        </span>
        <span className="strap strap-lg circle">
          <span className={`plate plate-lg ${this.props.centerPlateShape}`}></span>
        </span>
        <span className="strap strap-sm">
          <span style={{
              backgroundColor: this.props.sideplateBackgroundColor
            }}
            className={`plate plate-sm ${this.props.sideplateShape}`}></span>
        </span>
        <span className="strap strap-sm">
          <span className="plate plate-sm buttons">
            <full-width-text>::::</full-width-text>
          </span>
        </span>

      </div>
    )
  }
}
