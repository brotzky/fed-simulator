import "./stylesheets/ranking"
import Icon from "../icon/icon"
import Label from "../label/label"
import React from "react"

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
                <td colSpan="3">
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
                let active = (wrestler.wins > 0 || wrestler.losses > 0)
                  ? "active"
                  : "inactive"
                return (
                  <tr className={active}
                    key={key}>
                    <td className="ranking__order statistic">
                      #{key + 1}
                    </td>
                    <td className="ranking__wrestler">
                      <Icon name={wrestler.name} />
                    </td>
                    <td className="ranking__name">
                      <If condition={this.props.showLabels}>
                        <Label
                          modifier={wrestler.brand}
                          name={wrestler.name}
                        />
                      </If>
                    </td>
                    <td className="ranking__wins statistic">
                      {wrestler.wins.toLocaleString()}
                    </td>
                    <td className="ranking__losses statistic">
                      {wrestler.losses.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </If>
      </div>
    )
  }
}
