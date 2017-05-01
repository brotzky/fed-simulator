import React from 'react'
import {nFormatter} from '../../helpers/nFormatter'

const AccountingCollection = ({events, totalCost, federationCash,}) => {
  return (
    <div>
      <div>
        Cash available: {nFormatter(federationCash)}
      </div>
      <hr />
      <ul>
        {events.map((event, key) => {
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
