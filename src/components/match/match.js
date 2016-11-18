import React from "react"
import { connect } from "react-redux"
import { SimMatch } from "./helpers"
import Moves from "./moves"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    drops: React.PropTypes.array.isRequired,
  }

  displayName = "Match"

  componentWillMount() {
    let wrestlers = this.props.drops.slice()
    wrestlers.forEach((wrestler, key) => {
      wrestlers[key].damage = wrestler.rating
    })
    this.match = new SimMatch([wrestlers[0], wrestlers[1]], Moves)
    this.match = this.match.ringBell()
  }

  render() {
    return (
      <div>
        {this.match.map((action, key) => {
          console.log()
          return (
            <div key={key}>
              <Choose>
                <When condition={action.action === "move"}>
                  {action.details.attacker.name} hit
                  &nbsp;{action.details.defender.name} with
                  &nbsp;{action.details.move.name} for
                  &nbsp;{action.details.move.damage} damage
                </When>
                <When condition={action.action === "winner"}>
                  {action.details.winner.name} Wins!
                </When>
              </Choose>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
}))(Match)
