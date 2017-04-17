/* eslint-disable */
import React from 'react'
import Page from './components/page/page'
import {IndexRoute, Route} from 'react-router'

const onChange = (previousRoute, nextRoute) => {
  if (ga && nextRoute.location && nextRoute.location.pathname[0] !== '/') {
    ga('send', 'pageview', nextRoute.location.pathname)
  }
}

export default () => {
  return (
    <Route path="/" onChange={onChange} component={Page}>
      <IndexRoute
        getComponent={(nextState, callback) => {
          require.ensure([], require => {
            callback(null, require('./pages/default').default)
          })
        }}
      />
      <Route
        path="*"
        getComponent={(nextState, callback) => {
          require.ensure([], require => {
            callback(null, require('./pages/default').default)
          })
        }}
      />
    </Route>
  )
}
