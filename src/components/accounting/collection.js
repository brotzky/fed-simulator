import React from 'react'

const AccountingCollection = ({collection,}) => {
  return (
    <ul>
      {collection.map((item, key) => {
        return (
          <li key={key}>
            {item.name}
          </li>
        )
      })}
    </ul>
  )
}

export default AccountingCollection
