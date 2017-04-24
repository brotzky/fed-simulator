import React, {Component} from 'react'
import PropTypes from 'prop-types'

const isActive = (wins, losses) => wins > 0 || losses > 0

export default class RankingRow extends Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
    wrestler: PropTypes.object.isRequired,
    showLabels: PropTypes.bool,
  }

  static defaultProps = {
    showLabels: true,
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.position !== nextProps.position ||
      this.props.wrestler.name !== nextProps.wrestler.name
    )
  }

  displayName = 'RankingRow'

  render() {
    const {wins, losses,} = this.props.wrestler

    return (
      <tr className={isActive(wins, losses) ? 'active' : 'inactive'}>
        <td className="ranking__order statistic">
          #{this.props.position}
        </td>
        <td className="ranking__name">
          {this.props.wrestler.name}
        </td>
        <td className="ranking__wins statistic">
          {this.props.wrestler.wins.toLocaleString()}
        </td>
        <td className="ranking__losses statistic">
          {this.props.wrestler.losses.toLocaleString()}
        </td>
      </tr>
    )
  }
}
