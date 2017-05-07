import React from 'react'
import groupBy from 'lodash.groupby'
import {nFormatter} from '../../helpers/nFormatter'

const AccountingCollection = ({liveShows, totalCost, federationCash,}) => {
  liveShows = groupBy(liveShows, 'size')
  return (
    <div>
      <div>
        Cash available: {nFormatter(federationCash)}
      </div>
      <hr />
      {Object.keys(liveShows).map((key, shows) => {
        return (
          <div key={key}>
            <h4>Size: {key}</h4>
            <ul>
              {liveShows[key].map((show, key) => {
                return (
                  <li key={key}>
                    {show.name} {nFormatter(show.cost)}
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
