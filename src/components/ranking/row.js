import "./stylesheets/ranking.scss"
import Label from "../label/label"
import React from "react"
import PropTypes from "prop-types"

const isActive = (wins, losses) => wins > 0 || losses > 0

export default class RankingRow extends React.Component {

  static propTypes = {
    position: PropTypes.number.isRequired,
    wrestler: PropTypes.object.isRequired,
    showLabels: PropTypes.bool,
  }

  static defaultProps = {
    showLabels: true,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.showLabels !== nextProps.showLabels
      || this.props.position !== nextProps.position
      || this.props.wrestler.name !== nextProps.wrestler.name
  }

  displayName = "RankingRow"

  render() {
    const {
      wins,
      losses,
    } = this.props.wrestler

    return (
      <tr className={(isActive(wins, losses) ? "active" : "inactive")}>
        <td className="ranking__order statistic">
          #{this.props.position}
        </td>
        <td className="ranking__name">
          <If condition={this.props.showLabels}>
            <Label modifier={this.props.wrestler.brand}
              name={this.props.wrestler.name}
            />
          </If>
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
