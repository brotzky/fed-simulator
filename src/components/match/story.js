import React from "react"

export default class Story extends React.Component {

  static defaultProps = {
    collection: [],
  }

  render() {
    return (
      <div className="story">
        <If condition={this.props.collection.length > 0}>
          {this.props.collection.map((action, key) => {
            return (
              <div className={`story__action story--${action.action}`} key={key}>
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
        </If>
      </div>
    )
  }
}
