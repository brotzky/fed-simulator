import React from "react"
import Icon from "../icon/icon"
import "./stylesheets/main"

export default class Ranking extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
  }

  displayName = "Ranking"

  render() {
    return (
      <div className="ranking">
        <h3>
          {this.props.title}
        </h3>
        <table className="ranking__table table table-striped">
          <thead>
            <tr>
              <td className="ranking__order">
              </td>
              <td className="ranking__wrestler">
                Wrestler
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
            {this.props.wrestlers.map((wrestler, key) => {
              let active = (wrestler.wins > 0)
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
