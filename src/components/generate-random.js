import React from "react"

const GenerateRandom = ({ onClick, }) => {
  return (
    <a className="cursor-pointer" onClick={onClick}>
      Skip <i className="icon fa fa-angle-right" aria-hidden="true" />
    </a>
  )
}

export default GenerateRandom
