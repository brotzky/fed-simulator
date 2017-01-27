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
            callback(null, require("./pages/creationism/creationism").default)
          })
        }}
       />
       <Route path="show">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/show/show").default)
             })
           }}
         />
       </Route>
       <Route path="creationism">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/creationism/creationism").default)
             })
           }}
         />
       </Route>
       <Route path="creationism/championship">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/creationism/championship").default)
             })
           }}
         />
       </Route>
       <Route path="shows">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/shows/shows").default)
             })
           }}
         />
       </Route>
       <Route path="evolution">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/evolution/evolution").default)
             })
           }}
         />
       </Route>
       <Route path="champions">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/champions/champions").default)
             })
           }}
         />
       </Route>
       <Route path="ppvs">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/ppvs/ppvs").default)
             })
           }}
         />
       </Route>
       <Route path="ranking">
         <IndexRoute
           getComponent={(nextState, callback) => {
             require.ensure([], (require) => {
               callback(null, require("./pages/ranking/ranking").default)
             })
           }}
         />
      </Route>
      <Route path="draft">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
              callback(null, require("./pages/draft/draft").default)
            })
          }}
        />
      </Route>
      <Route
        path="*"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require("./pages/creationism/creationism").default)
          })
        }}
      />
    </Route>
  )
}
