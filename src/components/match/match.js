import React from "react"
import { connect } from "react-redux"
import { SimMatch } from "./helpers"
import Helmet from "react-helmet"
import Moves from "./moves"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    drops: React.PropTypes.array.isRequired,
  }

  displayName = "Match"

  componentDidMount() {
    let wrestlers = this.props.drops.slice()
    wrestlers.forEach((wrestler, key) => {
      wrestlers[key].damage = wrestler.rating
    })
    let currentMatch = new SimMatch([wrestlers[0], wrestlers[1]], Moves)
    currentMatch.ringBell().forEach((event) => {
      console.log(event)
    })
  }

  render() {
    return (
      <div>
        Match
      </div>
    )
  }
}

export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
}))(Match)
