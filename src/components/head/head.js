import React from "react"
import Helmet from "react-helmet"

const Head = () => {
  return (
    <Helmet
      titleTemplate="%s - Welcome"
      defaultTitle="Welcome"
    />
  )
}


export default Head
