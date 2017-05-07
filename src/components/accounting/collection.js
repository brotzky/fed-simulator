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
      <div className="accounting_available">
        Cash available: {nFormatter(federationCash)}
      </div>
      <hr />
      {Object.keys(liveShows).map((key, shows) => {
        return (
          <div className="accounting__collection" key={key}>
            <h4 className="accounting__header">Size: {key}</h4>
            <ul className="accounting__list">
              {liveShows[key].map((show, key) => {
                return (
                  <li className="item" key={key}>
                    <span className="item__name">
                      {show.name}&nbsp;
                    </span>
                    <span className="item__cost">
                      {nFormatter(show.cost)}
                    </span>
                    <span
                      className="item__delete fa fa-trash red"
                      onClick={() => onClickDelete()}
                    />
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
