import React from "react"
import Icon from "../icon/icon"
import "./stylesheets/main"

export default class Ranking extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
  }

  displayName = "Ranking"

  render() {
    console.log(this.props.wrestlers)
    return (
      <div>
        <table className="ranking table table-striped">
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
              return (
                <tr key={key}>
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
