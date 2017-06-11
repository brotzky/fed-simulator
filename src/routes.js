import React from "react"
import Page from "./components/page/page"
import { IndexRoute, Route } from "react-router"

const onChange = (previousRoute, nextRoute) => {
  // eslint-disable-next-line
  if (ga && nextRoute.location && nextRoute.location.pathname[0] !== "/") {
    // eslint-disable-next-line
    ga("send", "pageview", nextRoute.location.pathname)
  }
}

export default () => {
  return (
    <Route path="/" onChange={onChange} component={Page}>
      <IndexRoute
        getComponent={(nextState, callback) => {
          require.ensure([], require => {
            callback(null, require("./pages/default").default, "default")
          })
        }}
      />
      <Route path="create-a-match">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/create-a-match").default, "match")
            })
          }}
        />
      </Route>
      <Route path="champions">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/champions").default, "champions")
            })
          }}
        />
      </Route>
      <Route path="eventResults">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(
                null,
                require("./pages/event-results").default,
                "eventResults"
              )
            })
          }}
        />
      </Route>
      <Route path="showsOverview">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(
                null,
                require("./pages/shows-overview").default,
                "showsOverview"
              )
            })
          }}
        />
      </Route>
      <Route path="branding">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/branding").default, "branding")
            })
          }}
        />
      </Route>
      <Route path="calendar">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/calendar").default, "calendar")
            })
          }}
        />
      </Route>
      <Route path="name">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/name").default, "name")
            })
          }}
        />
      </Route>
      <Route path="size">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/size").default, "size")
            })
          }}
        />
      </Route>
      <Route path="shows">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/shows").default, "shows")
            })
          }}
        />
      </Route>
      <Route path="roster">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/roster").default, "roster")
            })
          }}
        />
      </Route>
      <Route path="ranking">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/ranking").default, "ranking")
            })
          }}
        />
      </Route>
      <Route path="utils">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], require => {
              callback(null, require("./pages/utils").default, "utils")
            })
          }}
        />
      </Route>
      <Route
        path="*"
        getComponent={(nextState, callback) => {
          require.ensure([], require => {
            callback(
              null,
              require("./pages/default").default,
              "default-fallback"
            )
          })
        }}
      />
    </Route>
  )
}
