import React from "react"
import "./stylesheets/story"

export default class Story extends React.Component {

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  static propTypes = {
    collection: React.PropTypes.array,
    wrestlers: React.PropTypes.array,
  }

  static defaultProps = {
    collection: [],
    wrestlers: [],
  }

  state = {
    colourIndex: [],
  }

  componentWillMount() {
    this.getWrestlersColourIndex()
  }

  getTitle(action) {
    return `${action.details.attacker.name}: ${action.details.move.name} for ${action.details.move.damage} on ${action.details.defender.name}`
  }

  getWrestlersColourIndex = () => {
    this.props.wrestlers.forEach((wrestler, key) => {
      this.state.colourIndex[wrestler.id] = key
    })
  }

  render() {
    return (
      <ul className="story">
        <If condition={this.props.collection.length > 0}>
          {this.props.collection.map((action, key) => {
            let
              brand = action.details.attacker
                ? action.details.attacker.brand
                : action.details.winner.brand,
              indexClass = (action.action === "move")
                ? `index-${this.state.colourIndex[action.details.attacker.id]}`
                : ""
            return (
              <li className={`story__action story--${action.action} ${indexClass}`}
                key={key}>
                <Choose>
                  <When condition={action.action === "move"}>
                    <div className="wrestler">
                      <strong>{action.details.attacker.name}</strong> {action.details.move.name} for {action.details.move.damage} damage on <strong>{action.details.defender.name}</strong>
                    </div>
                  </When>
                  <When condition={action.action === "winner"}>
                    <div className="story__winner">
                      <strong>{action.details.winner.name}<sup>{action.details.winner.damage}</sup></strong> covers {action.details.loser.name}<sup>{action.details.loser.damage}</sup> for the win!
                    </div>
                  </When>
                </Choose>
              </li>
            )
          })}
        </If>
      </ul>
    )
  }
}
