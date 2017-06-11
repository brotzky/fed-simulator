import React, { Component } from "react"
import PropTypes from "prop-types"

import "./ranking.scss"

export default class Ranking extends Component {
  static propTypes = {
    amountToShow: PropTypes.number,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    amountToShow: 10,
    rows: [],
    columns: [],
  }

  displayName = "Ranking"

  render() {
    return (
      <div className="ranking">
        <h2>{this.props.title}</h2>
        <table className="ranking__table table table-striped">
          <thead>
            <tr>
              {this.props.columns.map((column, key) => {
                return <td className={column} key={key}>{column}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.rows
              .slice(0, this.props.amountToShow)
              .map((row, rowKey) => {
                return (
                  <tr key={rowKey}>
                    {this.props.columns.map((column, key) => {
                      return (
                        <td className={column} key={key}>
                          {column === "rank" ? rowKey + 1 : row[column]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}
