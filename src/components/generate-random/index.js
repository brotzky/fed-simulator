import React from 'react'

const GenerateRandom = ({onClick,}) => {
  return (
    <i className="fa fa-random" aria-hidden="true" onClick={onClick}>
      Generate
    </i>
  )
}

export default GenerateRandom
