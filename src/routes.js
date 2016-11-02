import React from 'react'
import Page from './components/page/page'
import { IndexRoute, Route } from 'react-router'

export default () => {
  return (
      <Route
        path="/"
        component={Page}>
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
              callback(null, require('./pages/bucket-drops').default)
            })
          }}
         />
        <Route path="about">
          <IndexRoute
            getComponent={(nextState, callback) => {
              require.ensure([], (require) => {
                callback(null, require('./pages/about').default)
              })
            }}
          />
        </Route>
        <Route
          path="*"
          getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
              callback(null, require('./pages/bucket-drops').default)
            })
          }}
         />
    </Route>
  )
}
