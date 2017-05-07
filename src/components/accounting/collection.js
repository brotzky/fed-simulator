import React from 'react'
import groupBy from 'lodash.groupby'
import {nFormatter} from '../../helpers/nFormatter'

const noop = () => {}

const AccountingCollection = ({
  liveShows,
  totalCost,
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
                    <span
                      className="item__delete fa fa-trash red"
                      data-date={show.date}
                      onClick={onClickDelete}
                    />
                    &nbsp;
                    <span className="item__name">
                      {show.name}
                    </span>
                    <span className="item__cost">
                      {nFormatter(show.cost)}
                    </span>
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
        <span className="total__cost">{nFormatter(totalCost)}</span>
      </div>
    </div>
  )
}

export default AccountingCollection
