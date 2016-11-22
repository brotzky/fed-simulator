import React from "react"
import { connect } from "react-redux"
import SelectionScreen from "../selection-screen/selection-screen"
import Story from "./story"
import { SimMatch } from "./sim-match.helper"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
  }

  state = {
    match: {},
  }

  displayName = "Match"

  onStartMatch = () => {
    let wrestlers = this.props.match.wrestlers.slice()
    wrestlers.forEach((wrestler, key) => {
      wrestlers[key].damage = wrestler.rating
    })
    let match = new SimMatch(wrestlers, this.props.moves)
    this.setState({
      match: match.ringBell()
    })
  }

  render() {
    // console.log(this.state)
    let buttonBrand = this.state.match.wrestlers
       ? toSlug(this.state.match.wrestlers[0])
       : "default"
    return (
      <div className="match">
        <div className="row">
          <div className="col-xs-3">
            <div className="bell">
              <button
                className={`btn btn-${buttonBrand} bell__button`}
                onClick={this.onStartMatch}>
                Ring the bell
              </button>
            </div>
            <br />
            <Story collection={this.state.match} />
          </div>
          <div className="col-xs-9">
            <SelectionScreen />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  match: state.match,
}))(Match)
