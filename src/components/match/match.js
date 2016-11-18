import React from "react"
import { connect } from "react-redux"
import Selection from "./selection"
import Story from "./story"
import { SimMatch } from "./helpers"
import Moves from "./moves"
import "./stylesheets/main"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    drops: React.PropTypes.array.isRequired,
  }

  state = {
    chosen: [],
    story: [],
  }

  displayName = "Match"

  onStartMatch = () => {
    let wrestlers = this.props.drops.slice()
    wrestlers.forEach((wrestler, key) => {
      wrestlers[key].damage = wrestler.rating
    })
    let match = new SimMatch([wrestlers[0], wrestlers[1]], Moves)
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
            <button onClick={this.onStartMatch}>
              Simulate Match!
            </button>
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
}))(Match)
