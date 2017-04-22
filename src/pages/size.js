import React from 'react'
import defaultOptions from './size.options.json'
import './stylesheets/size.scss'

const Size = ({options = defaultOptions,}) => {
  return (
    <section className="page size">
      <h1>How big are you?!</h1>
      <div className="row options">
        {options.map(option => {
          return (
            <div className="col-xs-3 option" key={option.id}>
              <h3>{option.name}</h3>
              <p>{option.size}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Size
