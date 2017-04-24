import './ranking.scss'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Row from './row'

export default class Ranking extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    wrestlers: PropTypes.array.isRequired,
    amountToShow: PropTypes.number,
  }

  static defaultProps = {
    amountToShow: 10,
  }

  displayName = 'Ranking'

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
                return (
                  <Row
                    key={wrestler.id}
                    position={key + 1}
                    wrestler={wrestler}
                  />
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}
