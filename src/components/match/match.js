import React from "react"
import { connect } from "react-redux"
import Selection from "./selection"
import Story from "./story"
import { SimMatch } from "./sim-match.helper"
import Moves from "./moves"
import "./stylesheets/main"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    drops: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
  }

  state = {
    chosen: [],
    story: [],
  }

  displayName = "Match"

  onStartMatch = () => {
    let wrestlers = this.props.match.wrestlers.slice()
    wrestlers.forEach((wrestler, key) => {
      wrestlers[key].damage = wrestler.rating
    })
    let match = new SimMatch(wrestlers, Moves)
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
              className="btn btn-default"
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
  buckets: state.buckets,
  drops: state.drops,
  match: state.match,
}))(Match)
