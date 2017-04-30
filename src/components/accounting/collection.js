import React from 'react'

const AccountingCollection = ({events,}) => {
  return (
    <ul>
      {events.map((event, key) => {
        return (
          <li key={key}>
            {event.name} {event.cost}
          </li>
        )
      })}
    </ul>
  )
}

export default AccountingCollection
