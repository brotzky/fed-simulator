import React from "react"

export default class Story extends React.Component {

  static defaultProps = {
    collection: [],
  }

  render() {
    return (
      <ul className="story">
        <If condition={this.props.collection.length > 0}>
          {this.props.collection.map((action, key) => {
            return (
              <li
                className={`story__action story--${action.action}`}
                key={key}>
                <Choose>
                  <When condition={action.action === "move"}>
                    {action.details.attacker.name} hit {action.details.defender.name} with {action.details.move.name} for {action.details.move.damage} damage
                  </When>
                  <When condition={action.action === "winner"}>
                    {action.details.winner.name} pins {action.details.loser.name} for the win!
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
