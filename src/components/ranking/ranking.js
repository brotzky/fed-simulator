import React from "react"
import Icon from "../icon/icon"
import "./stylesheets/main"

export default class Ranking extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    amountToShow: React.PropTypes.number,
    showLabels: React.PropTypes.bool,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    amountToShow: 10,
    showLabels: true,
  }

  displayName = "Ranking"

  render() {
    return (
      <div className="ranking">
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
              let active = (wrestler.wins > 0 || wrestler.losses > 0)
                ? "active"
                : "inactive"
              return (
                <tr className={active}
                  key={key}>
                  <td className="ranking__order">
                    #{key + 1}
                  </td>
                  <td className="ranking__wrestler">
                    <Icon name={wrestler.name} />
                    <If condition={this.props.showLabels}>
                      <br />
                      <div className={`label label-${this.context.toSlug(wrestler.brand)}`}>
                        {wrestler.brand}
                      </div>
                    </If>
                  </td>
                  <td className="ranking__wins">
                    {wrestler.wins}
                  </td>
                  <td className="ranking__losses">
                    {wrestler.losses}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
