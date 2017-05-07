import React from 'react'
import groupBy from 'lodash.groupby'
import {nFormatter} from '../../helpers/nFormatter'

const noop = () => {}

const AccountingCollection = ({
  liveShows = [],
  totalCost = 0,
  totalGross = 0,
  isComplete = false,
  onClickDelete = noop,
  federationCash,
}) => {
  liveShows = groupBy(liveShows, 'size')
  return (
    <div className="accounting">
      <div className="total">
        <span className="total__title">Cash available:</span>
        <span className="total__cost">{nFormatter(federationCash)}</span>
      </div>
      <hr />
      {Object.keys(liveShows).map(index => {
        return (
          <div className="accounting__collection" key={index}>
            <h4 className="accounting__header">Size: {index}</h4>
            <ul className="accounting__list">
              {liveShows[index].map((show, key) => {
                return (
                  <li className="item" key={key}>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td colSpan="2">
                            <If condition={!isComplete}>
                              <span
                                className="item__delete fa fa-trash red"
                                data-date={show.date}
                                onClick={onClickDelete}
                              />
                              &nbsp;
                            </If>
                            {show.name}
                            <span className="item__cost">
                              {nFormatter(show.cost)}
                            </span>
                          </td>
                        </tr>
                        <If condition={show.gross > 0}>
                          <tr>
                            <td colSpan="2">
                              Gross
                              <span className="item__cost">
                                {nFormatter(show.gross)}
                              </span>
                            </td>
                          </tr>
                        </If>
                      </tbody>
                    </table>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
      <hr />
      <div className="total">
        <span className="total__title">Total Cost</span>
        <span className="total__cost total">{nFormatter(totalCost)}</span>
      </div>
      <If condition={isComplete}>
        <div className="total">
          <span className="total__title">Total Gross</span>
          <span className="total__cost gross">{nFormatter(totalGross)}</span>
        </div>
        <div className="total">
          <span className="total__title">Total Profit</span>
          <span className="total__cost profit">
            {nFormatter(totalGross - totalCost)}
          </span>
        </div>
      </If>
    </div>
  )
}

export default AccountingCollection
