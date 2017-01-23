import React from "react"
import "./stylesheets/championship-belt"

export default class CreateChampionship extends React.Component {

  displayName = "CreateChampionship"

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
    const strapStyle = {
      backgroundColor: this.props.strapBackgroundColor,
      color: this.props.strapColor,
    }
    const plateStyle = {
      backgroundColor: this.props.plateBackgroundColor,
      color: this.props.plateColor,
    }
    const buttonsStyle = {
      color: this.props.plateBackgroundColor,
    }
    return (
      <div className="belt">
        <span className="strap">
          <span style={strapStyle}
            className="belt__strap belt__strap--side buttons">
            <span style={buttonsStyle}>:::</span>
          </span>
          <span style={strapStyle}
            className="belt__strap belt__strap--side encased-by">
            <span className="plate"
              style={plateStyle}>&nbsp;</span>
          </span>
          <span style={strapStyle}
            className={`belt__strap belt__strap--center ${this.props.plateShape}`}>
            <span className="plate"
              style={plateStyle}>
              <span className="plate__nameplate">
                {this.props.championsName}
              </span>
            </span>
          </span>
          <span style={strapStyle}
            className="belt__strap belt__strap--side encased-by">
            <span className="plate"
              style={plateStyle}>&nbsp;</span>
          </span>
          <span style={strapStyle}
            className="belt__strap belt__strap--side buttons">
            <span style={buttonsStyle}>:::</span>
          </span>
        </span>
        <div className="belt__name">
          <h3>{this.props.championshipName}</h3>
        </div>
      </div>
    )
  }
}
