import React from "react"
import Page from "./components/page/page"
import { IndexRoute, Route } from "react-router"

export default () => {
  return (
      <Route
        path="/"
        component={Page}>
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
              callback(null, require("./pages/draft").default)
            })
          }}
         />
        <Route path="match">
          <IndexRoute
            getComponent={(nextState, callback) => {
              require.ensure([], (require) => {
                callback(null, require("./pages/match").default)
              })
            }}
          />
        </Route>
        <Route path="draft">
          <IndexRoute
            getComponent={(nextState, callback) => {
              require.ensure([], (require) => {
                callback(null, require("./pages/draft").default)
              })
            }}
          />
        </Route>
        <Route
          path="*"
          getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
              callback(null, require("./pages/draft").default)
            })
          }}
         />
    </Route>
  )
}
