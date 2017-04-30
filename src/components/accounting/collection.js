import React from 'react'

const AccountingCollection = ({events, totalCost, federationCash,}) => {
  return (
    <div>
      <div>
        Federation cash available: {federationCash}
      </div>
      <hr />
      <ul>
        {events.map((event, key) => {
          return (
            <li key={key}>
              {event.name} {event.cost}
            </li>
          )
        })}
      </ul>
      <hr />
      <div>
        Total Cost = {totalCost}
      </div>
    </div>
  )
}

export default AccountingCollection
