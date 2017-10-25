/* eslint-disable no-console */
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

const Router = () => {
  return (
    <Route path="/" onChange={onChange} component={Page}>
      <IndexRoute
        getComponent={(location, cb) => {
          System.import("./pages/default/default")
            .then(loadRoute(cb))
            .catch(errorLoading)
        }}
      />
      <Route path="welcome">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/welcome/container")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="create-a-match">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/create-a-match/container")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="manage-roster">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/manage-roster/container")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="manage-brands">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/manage-brands/container")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="draft">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/draft/container")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="dashboard">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/dashboard/dashboard")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="championships">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/championships/container")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="branding">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/branding/branding")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="name">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/name/name")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route path="settings">
        <IndexRoute
          getComponent={(location, cb) => {
            System.import("./pages/settings/settings")
              .then(loadRoute(cb))
              .catch(errorLoading)
          }}
        />
      </Route>
      <Route
        path="*"
        getComponent={(location, cb) => {
          System.import("./pages/default/default")
            .then(loadRoute(cb))
            .catch(errorLoading)
        }}
      />
    </Route>
  )
}

export default Router
