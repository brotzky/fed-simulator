import React from "react"
import "./stylesheets/championship-belt"

export default class ChampionshipBelt extends React.Component {

  displayName = "ChampionshipBelt"

  static propTypes = {
    strapBackgroundColor: React.PropTypes.string,
    plateShape: React.PropTypes.string,
    plateBackgroundColor: React.PropTypes.string,
    plateColor: React.PropTypes.string,
    championsName: React.PropTypes.string,
  }

  static defaultProps = {
    championshipName: "Unknown",
    championsName: "Vacant",
    plateBackgroundColor: "gold",
    plateColor: "#91702d",
    plateShape: "circle",
    strapBackgroundColor: "#000",
  }

  render() {
    let strapStyle, buttonsStyle, plateStyle
    // const strapStyle = {
    //   backgroundColor: this.props.strapBackgroundColor,
    //   color: this.props.strapColor,
    // }
    // const plateStyle = {
    //   backgroundColor: this.props.plateBackgroundColor,
    //   color: this.props.plateColor,
    // }
    // const buttonsStyle = {
    //   color: this.props.plateBackgroundColor,
    // }
    return (
      <div className="belt">

        <span className="strap">
          <span className="plate plate-sm">
            <span className="plate buttons">:::</span>
          </span>
        </span>

        <span className="strap">
          <span className="plate plate-sm">
            <span className="plate rectangle"></span>
          </span>
        </span>

        <span className="strap strap-lg">
          <span className="plate plate-lg">
            <span className="plate rectangle"></span>
          </span>
        </span>

        <span className="strap">
          <span className="plate plate-sm">
            <span className="plate rectangle"></span>
          </span>
        </span>

        <span className="strap">
          <span className="plate plate-sm">
            <span className="plate buttons">:::</span>
          </span>
        </span>

      </div>
    )
  }
}
