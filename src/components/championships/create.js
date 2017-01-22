import React from "react"
import "./stylesheets/create"

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
    plateShape: "circle",
    strapBackgroundColor: "#000",
    plateBackgroundColor: "gold",
    plateColor: "brown",
    championsName: "John Doe",
  }

  render() {
    const containerStyle = {
      width: "50rem",
      height: "13rem",
    }
    const strapStyle= {
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
      <div className="container"
        style={containerStyle}>
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
        </div>
      </div>
    )
  }
}
