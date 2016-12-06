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
              callback(null, require("./pages/landing/landing").default)
            })
          }}
         />
         <Route path="show">
           <IndexRoute
             getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                 callback(null, require("./pages/show").default)
               })
             }}
           />
         </Route>
         <Route path="champions">
           <IndexRoute
             getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                 callback(null, require("./pages/champions").default)
               })
             }}
           />
         </Route>
         <Route path="ranking">
           <IndexRoute
             getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                 callback(null, require("./pages/ranking").default)
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
              callback(null, require("./pages/landing/landing").default)
            })
          }}
         />
    </Route>
  )
}
