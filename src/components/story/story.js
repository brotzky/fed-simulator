import React from "react"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

export default class Story extends React.Component {

  static defaultProps = {
    collection: [],
  }

  render() {
    let totalWidthPoints = this.props.collection
      .filter((action) => action.action === "move")
      .reduce((sum, action) => {
        return sum + action.details.move.damage
      }, 0)
    return (
      <div className="row">
        <ul className="col-xs-12 story">
          <If condition={this.props.collection.length > 0}>
            {this.props.collection.map((action, key) => {
              let
                brand = action.details.attacker
                  ? action.details.attacker.brand
                  : action.details.winner.brand,
                width = (action.action === "move")
                  ? 100 * action.details.move.damage / totalWidthPoints
                  : 100,
                style = {
                  width: `${width}%`,
                  borderRight: "1px solid black",
                }
              return (
                <li style={style}
                  className={`story__action story--${action.action} brand--${toSlug(brand)}`}
                  key={key}>
                  <Choose>
                    <When condition={action.action === "move"}>
                      <p>{action.details.attacker.name}</p>
                      <p>{action.details.move.name} ({action.details.move.damage})</p>
                      <p>{action.details.defender.name}</p>
                    </When>
                    <When condition={action.action === "winner"}>
                      <span className="clearfix story__winner">
                        {action.details.winner.name} covers {action.details.loser.name} for the win!
                      </span>
                    </When>
                  </Choose>
                </li>
              )
            })}
          </If>
        </ul>
      </div>
    )
  }
}
