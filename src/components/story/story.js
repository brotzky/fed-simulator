import React from "react"
import Icon from "../icon/icon"
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
    // let totalWidthPoints = this.props.collection
    //   .filter((action) => action.action === "move")
    //   .reduce((sum, action) => {
    //     return sum + action.details.move.damage
    //   }, 0)
    return (
      <div className="row">
        <ul className="col-xs-12 story">
          <If condition={this.props.collection.length > 0}>
            {this.props.collection.map((action, key) => {
              let
                brand = action.details.attacker
                  ? action.details.attacker.brand
                  : action.details.winner.brand,
                // width = (action.action === "move")
                //   ? 100 * action.details.move.damage / totalWidthPoints
                //   : 100,
                style = {},
                //   width: `${width}%`,
                //   borderRight: "1px solid black",
                // },
                indexClass = (action.action === "move")
                  ? `index-${this.state.colourIndex[action.details.attacker.id]}`
                  : ""
              return (
                <li style={style}
                  className={`story__action story--${action.action} ${indexClass} brand--${this.context.toSlug(brand)}`}
                  key={key}>
                  <Choose>
                    <When condition={action.action === "move"}>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="wrestler">
                              {action.details.attacker.name.match(/\b(\w)/g).join("")}
                            </td>
                            <td>
                              {action.details.move.name}
                              <br />
                              for {action.details.move.damage} damage
                            </td>
                            <td className="wrestler">
                              {action.details.defender.name.match(/\b(\w)/g).join("")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </When>
                    <When condition={action.action === "winner"}>
                      <h2 className="story__winner">
                        {action.details.winner.name} covers {action.details.loser.name} for the win!
                      </h2>
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
