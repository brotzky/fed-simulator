import React from "react"
import { Router, hashHistory } from "react-router"
import { Provider } from "react-redux"
import { context } from "./components/context-holder/default"
import ContextHolder from "./components/context-holder/context-holder"
import routes from "./routes"
import configureStore from "./store/configure-store"

const store = configureStore()

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ContextHolder context={context}>
          <Router
            history={hashHistory}
            routes={routes()}
          />
        </ContextHolder>
      </Provider>
    )
  }
}
