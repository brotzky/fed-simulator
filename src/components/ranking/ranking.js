import React from "react"
import PropTypes from "prop-types"

import { formatCurrency } from "../../helpers/currency"

import "./ranking.scss"

const Ranking = ({ currencySymbol, style, columns, rows, amountToShow, title, }) => (
  <div className="ranking">
    <h3 style={style}>{title}</h3>
    <table className="ranking__table table table-striped">
      <thead>
        <tr>
          {Object.keys(columns).map((column, key) => {
            return (
              <td className={column} tabIndex="0" key={`thead-${key}`}>
                {column}
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.slice(0, amountToShow).map((row, rowKey) => {
          return (
            <tr key={rowKey}>
              {Object.keys(columns).map((column, key) => {
                let type = columns[column].type
                return (
                  <td className={column} tabIndex="0" key={key}>
                    <Choose>
                      <When condition={type === "rank"}>#{rowKey + 1}</When>
                      <When condition={type === "currency"}>{formatCurrency(currencySymbol, row[column])}</When>
                      <Otherwise>{row[column]}</Otherwise>
                    </Choose>
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

Ranking.propTypes = {
  amountToShow: PropTypes.number,
  columns: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string,
  rows: PropTypes.array.isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
}

Ranking.defaultProps = {
  amountToShow: 100,
  columns: {},
  currencySymbol: "$",
  rows: [],
  style: {},
}

export default Ranking
