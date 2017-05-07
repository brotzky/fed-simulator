import React from 'react'
import {nFormatter} from '../../helpers/nFormatter'

const AccountingCollection = ({liveShows, totalCost, federationCash,}) => {
  return (
    <div>
      <div>
        Cash available: {nFormatter(federationCash)}
      </div>
      <hr />
      <ul>
        {liveShows.map((event, key) => {
          return (
            <li key={key}>
              {event.name} {nFormatter(event.cost)}
            </li>
          )
        })}
      </ul>
      <hr />
      <div>
        Total Cost = {nFormatter(totalCost)}
      </div>
    </div>
  )
}

export default AccountingCollection
