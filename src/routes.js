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

function errorLoading(err) {
  console.error("Dynamic page loading failed", err)
}

function loadRoute(cb) {
  return module => cb(null, module.default)
}

export default () => {
  return (
    <Route path="/" onChange={onChange} component={Page}>
      <IndexRoute
        getComponent={(location, cb) => {
          System.import("./pages/default")
            .then(loadRoute(cb))
            .catch(errorLoading)
        }}
      />
      <Route path="create-a-match">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/create-a-match")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="dashboard">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/dashboard")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="champions">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/champions")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="branding">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/branding")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="calendar">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/calendar")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="name">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/name")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="size">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/size")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="shows">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/shows")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="roster">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/roster")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="ranking">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/ranking")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="settings">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/settings")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route
        path="*"
        getComponent={(location, cb) => {
          System.import("./pages/default")
            .then(loadRoute(cb))
            .catch(errorLoading)
        }}
      />
    </Route>
  )
}
