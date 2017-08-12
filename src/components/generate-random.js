import React from "react"

import "./generate-random.scss"

const GenerateRandom = ({ onClick, }) => {
  return (
    <a className="cursor-pointer generate-random" onClick={onClick}>
      Auto Generate <i className="icon fa fa-angle-right" aria-hidden="true" />
    </a>
  )
}

export default GenerateRandom
