import React from "react"
import { connect } from "react-redux"
import Selection from "./selection"
import Story from "./story"
import { SimMatch } from "./sim-match.helper"
import "./stylesheets/main"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
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
    return (
      <div className="match">
        <div className="row">
          <div className="col-xs-8">
            <Selection />
          </div>
          <div className="col-xs-4">
            <button
              className="btn btn-general"
              onClick={this.onStartMatch}>
              Ring the bell
            </button>
            <br />
            <Story collection={this.state.match} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  moves: state.moves,
  wrestlers: state.wrestlers,
  match: state.match,
}))(Match)
