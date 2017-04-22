import React from 'react'
import Helmet from 'react-helmet'
import constants from '../../constants'

const Head = () => {
  return (
    <Helmet
      titleTemplate="%s - Welcome"
      defaultTitle="Welcome"
      base={{
        href: constants.baseUrl,
      }}
    />
  )
}

export default Head
