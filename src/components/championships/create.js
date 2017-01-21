import React from "react"
import "./stylesheets/create"

export default class CreateChampionship extends React.Component {

  displayName = "CreateChampionship"

  static propTypes = {
    strapBackgroundColor: React.PropTypes.string,
    platShape: React.PropTypes.string,
    plateBackgroundColor: React.PropTypes.string,
    plateColor: React.PropTypes.string,
    championsName: React.PropTypes.string,
  }

  static defaultProps = {
    platShape: "circle",
    strapBackgroundColor: "#000",
    plateBackgroundColor: "gold",
    plateColor: "black",
    championsName: "John Doe",
  }

  render() {
    const strapStyle= {
      backgroundColor: this.props.strapBackgroundColor,
      color: this.props.strapColor,
    }
    const plateStyle = {
      backgroundColor: this.props.plateBackgroundColor,
      color: this.props.plateColor,
    }
    return (
      <div className="belt">
        <span className="strap">
          <span style={strapStyle}
            className="belt__strap belt__strap--side">
            <span className="plate"
              style={plateStyle}>&nbsp;</span>
          </span>
          <span style={strapStyle}
            className="belt__strap circle belt__strap--center">
            <span className="plate "
              style={plateStyle}>
              <span className="plate__nameplate">
                {this.props.championsName}
              </span>
            </span>
          </span>
          <span style={strapStyle}
            className="belt__strap belt__strap--side">
            <span className="plate"
              style={plateStyle}>&nbsp;</span>
          </span>
        </span>
      </div>
    )
  }
}
