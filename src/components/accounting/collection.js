import React from 'react'
import groupBy from 'lodash.groupby'
import {nFormatter} from '../../helpers/nFormatter'

const AccountingCollection = ({liveShows, totalCost, federationCash,}) => {
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
                      {show.name}
                    </span>
                    <span className="item__cost green">
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
      <div>
        Total Cost = {nFormatter(totalCost)}
      </div>
    </div>
  )
}

export default AccountingCollection
