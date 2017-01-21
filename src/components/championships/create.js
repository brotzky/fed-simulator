import React from "react"

export default class CreateChampionship extends React.Component {

  displayName = "CreateChampionship"

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
        <span className="strap"
          style={strapStyle}>
          <span className="belt__strap--right">
            <span className="plate"></span>
            <span className="buttons"></span>
          </span>
          <span className="belt__strap--center">
            <span className="plate"
              style={plateStyle}>
              <span className="plate__nameplate">
                {this.props.name}
              </span>
            </span>
          </span>
          <span className="belt__strap--right">
            <span className="plate"></span>
            <span className="buttons"></span>
          </span>
        </span>
      </div>
    )
  }
}
