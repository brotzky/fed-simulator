import React from 'react'
import Page from './components/page/page'
import {IndexRoute, Route} from 'react-router'

const onChange = (previousRoute, nextRoute) => {
  if (ga && nextRoute.location && nextRoute.location.pathname[0] != '/') {
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
      <Route path="champions">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/champions').default)
            })
          }}
        />
      </Route>
      <Route path="eventResults">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/event-results').default)
            })
          }}
        />
      </Route>
      <Route path="calendar">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/calendar').default)
            })
          }}
        />
      </Route>
      <Route path="name">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/name').default)
            })
          }}
        />
      </Route>
      <Route path="size">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/size').default)
            })
          }}
        />
      </Route>
      <Route path="ppvs">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/ppvs').default)
            })
          }}
        />
      </Route>
      <Route path="roster">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/roster').default)
            })
          }}
        />
      </Route>
      <Route path="ranking">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require('./pages/ranking').default)
            })
          }}
        />
      </Route>
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
