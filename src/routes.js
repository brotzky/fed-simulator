import React, { Component } from 'react'
import Page from './components/page/page'
import { Route, Router, hashHistory } from 'react-router'
import { Champions, Default, eventResults, Events, Name, PPVS, Roster, Size } from './Pages/index'

export const routes = [
  {
     'pattern':'/champions',
     'component': Champions,
  },
   {
    'pattern':'/',
    'component': Default,
    'exactly': true,
 },
 {
    'pattern':'/eventResults',
    'component': eventResults,
 },
 {
    'pattern':'/events',
    'component': Events,
 },
 {
    'pattern':'/name',
    'component': Name,
 },
 {
    'pattern':'/ppvs',
    'component': PPVS,
 },
 {
    'pattern':'/roster',
    'component': Roster,
 },
 {
    'pattern':'/Ssze',
    'component': Size,
 },
]
export default class Routes extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Page>
          <main>
            {routes.map((route, index) => (
              <Route key={index} path={route.pattern} component={route.component} />
            ))}
          </main>
        </Page>
      </Router>
    )
  }
}
