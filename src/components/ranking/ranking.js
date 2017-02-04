import "./stylesheets/ranking"
import React from "react"
import Row from "./row"

export default class Ranking extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    amountToShow: React.PropTypes.number,
    showLabels: React.PropTypes.bool,
  }

  static defaultProps = {
    amountToShow: 10,
    showLabels: true,
  }

  displayName = "Ranking"

  render() {
    return (
      <div className="ranking">
        <If condition={this.props.wrestlers.length > 0}>
          <table className="ranking__table table table-striped">
            <thead>
              <tr>
                <td colSpan="2">
                  <h3 className="ranking__title">
                    {this.props.title}
                  </h3>
                </td>
                <td className="ranking__wins">
                  Wins
                </td>
                <td className="ranking__losses">
                  Losses
                </td>
              </tr>
            </thead>
            <tbody>
            {this.props.wrestlers
              .slice(0, this.props.amountToShow)
              .map((wrestler, key) => {
                return (
                  <Row key={wrestler.id}
                    position={ (key + 1) }
                    wrestler={wrestler}
                    showLabels={this.props.showLabel}
                  />
                )
            })}
            </tbody>
          </table>
        </If>
      </div>
    )
  }
}
